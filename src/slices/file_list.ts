import backendInstance from '@/lib/axios'
import { apiEndpoints } from '@/config'
import { v4 as uuidv4 } from 'uuid'
import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from '@reduxjs/toolkit'

import { FileList } from '@/pages/api/entity'
import { getBucket } from '@/lib/firebase'
import { ref, uploadBytes } from 'firebase/storage'
import { NewRow } from '@/pages/api/interface/common'

interface FileListState {
  fileList: FileList[]
  fileListByProject: FileList[]
  loading: boolean
}

const initialState: FileListState = {
  fileList: [],
  fileListByProject: [],
  loading: false,
}

export const fetchfileList = createAsyncThunk(
  'fileList/fetchfileList',
  async () => {
    const { data } = await backendInstance.get<FileList[]>(
      apiEndpoints.fileList,
    )
    return data
  },
)

export const fetchFileListByProject = createAsyncThunk(
  'fileList/fetchFileListByProject',
  async (project_id: number) => {
    const params = { project_id }
    const { data } = await backendInstance.get<FileList>(
      apiEndpoints.fileList,
      {
        params,
      },
    )
    return data
  },
)

export const createFile = createAsyncThunk(
  'fileList/createFile',
  async ({ file, fileList }: { file: File; fileList: NewRow<FileList> }) => {
    const storage = getBucket()
    const uuid = uuidv4()
    const location = `projects/${fileList.project.project_id}/${uuid}-${file.name}`
    await uploadBytes(ref(storage, location), file)

    const { data } = await backendInstance.post<FileList>(
      apiEndpoints.fileList,
      { ref: location, fileList },
    )
    return data
  },
)

export const deleteFile = createAsyncThunk(
  'fileList/deleteFile',
  async (file_id: number) =>
    backendInstance.delete(apiEndpoints.fileList, {
      data: { file_id },
    }),
)

export const fileListSlice = createSlice({
  name: 'fileList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchfileList.fulfilled.type,
        (state, action: PayloadAction<FileList[]>) => {
          state.fileList = action.payload
        },
      )
      .addCase(
        fetchFileListByProject.fulfilled.type,
        (state, action: PayloadAction<FileList[]>) => {
          state.fileListByProject = action.payload
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

export default fileListSlice.reducer
