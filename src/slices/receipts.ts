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
import { Receipt } from '@/pages/api/entity'
import { v4 as uuidv4 } from 'uuid'

import { getBucket } from '@/lib/firebase'
import { ref, uploadBytes } from 'firebase/storage'

export const fetchReceiptById = createAsyncThunk(
  'receipts/fetchReceiptById',
  async () => {
    const { data } = await backendInstance.get<Receipt>(apiEndpoints.receipts)
    return data
  },
)

export const fetchReceiptByTaskId = createAsyncThunk(
  'receipts/fetchReceiptByTaskId',
  async (task_id: number) => {
    const { data } = await backendInstance.get<Receipt[]>(
      apiEndpoints.receipts,
      { params: { task_id } },
    )
    return data
  },
)

export const createReceiptByTaskId = createAsyncThunk(
  'receipts/createReceiptByTaskId',
  async ({ receipt, file }: { receipt: Receipt; file: File }) => {
    const storage = getBucket()
    const uuid = uuidv4()
    const location = `deliverTask/${receipt.deliverTask.task_id}/receipts/${uuid}-${file.name}`
    await uploadBytes(ref(storage, location), file)

    const { data } = await backendInstance.post(apiEndpoints.receipts, {
      ref: location,
      receipt,
    })
    return data
  },
)

export const receiptSlice = createSlice({
  name: 'receipts',
  initialState: {
    receipt: {} as Receipt,
    receipts: [] as Receipt[],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchReceiptById.fulfilled.type,
        (state, action: PayloadAction<Receipt>) => {
          state.receipt = action.payload
        },
      )
      .addCase(
        fetchReceiptByTaskId.fulfilled.type,
        (state, action: PayloadAction<Receipt[]>) => {
          state.receipts = action.payload
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

export default receiptSlice.reducer
