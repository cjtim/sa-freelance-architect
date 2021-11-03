import backendInstance from '@/lib/axios'
import { apiEndpoints } from '@/config'
import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from '@reduxjs/toolkit'
import { DeliverTask } from '@/pages/api/entity'
import { sortBy } from '@/utils/sort'
import { v4 as uuidv4 } from 'uuid'

import { getBucket } from '@/lib/firebase'
import { ref, uploadBytes } from 'firebase/storage'

export const fetchDeliverTaskByProject = createAsyncThunk(
  'deliverTasks/fetchDeliverTaskByProject',
  async (project_id: number) => {
    const { data } = await backendInstance.get<DeliverTask[]>(
      apiEndpoints.deliverTasks,
      { params: { project_id } },
    )
    return data
  },
)

export const fetchDeliverTaskById = createAsyncThunk(
  'deliverTasks/fetchDeliverTaskById',
  async (task_id: number) => {
    const { data } = await backendInstance.get<DeliverTask>(
      apiEndpoints.deliverTasks,
      { params: { task_id } },
    )
    return data
  },
)

export const upsertDeliverTaskByProject = createAsyncThunk(
  'deliverTasks/upsertDeliverTaskByProject',
  async ({ deliverTask, file }: { deliverTask: DeliverTask; file?: File }) => {
    let location = ''
    if (file) {
      const storage = getBucket()
      const uuid = uuidv4()
      location = `deliverTask/${deliverTask.task_id}/files/${uuid}-${file.name}`
      await uploadBytes(ref(storage, location), file)
    }

    const { data } = await backendInstance.post<DeliverTask>(
      apiEndpoints.deliverTasks,
      { deliverTask, ref: file ? location : '' },
    )
    return data
  },
)

export const deleteDeliverTaskById = createAsyncThunk(
  'deliverTasks/deleteDeliverTaskById',
  async (task_id: number) => {
    const { data } = await backendInstance.delete(apiEndpoints.deliverTasks, {
      params: { task_id },
    })
    return data
  },
)

export const DeliverTaskSlice = createSlice({
  name: 'deliverTasks',
  initialState: {
    deliverTasks: [] as DeliverTask[],
    deliverTask: {} as DeliverTask,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchDeliverTaskByProject.fulfilled.type,
        (state, action: PayloadAction<DeliverTask[]>) => {
          state.deliverTasks = sortBy(action.payload, 'created_at')
        },
      )
      .addCase(
        fetchDeliverTaskById.fulfilled.type,
        (state, action: PayloadAction<DeliverTask>) => {
          state.deliverTask = action.payload
        },
      )
      .addMatcher(isPending(), (state) => {
        state.loading = true
      })
      .addMatcher(isFulfilled(), (state) => {
        state.loading = false
      })
      .addMatcher(isRejected(), (state) => {
        state.loading = false
      })
  },
})

// export const { } = photoSlice.actions

export default DeliverTaskSlice.reducer
