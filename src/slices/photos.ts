import backendInstance from '@/lib/axios'

import { v4 as uuidv4 } from 'uuid'
import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from '@reduxjs/toolkit'
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { apiEndpoints, NEXT_CONFIG } from '@/config'
import { Files } from '@/pages/api/entity/files'

if (!getApps().length) {
  initializeApp({
    storageBucket: NEXT_CONFIG.BUCKET_NAME,
    projectId: NEXT_CONFIG.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    apiKey: NEXT_CONFIG.NEXT_PUBLIC_FIREBASE_API_KEY,
  })
}

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(getApp())
// Define a type for the slice state
interface FileState {
  value: Files[]
  loading: boolean
  url: string
}

// Define the initial state using that type
const initialState: FileState = {
  value: [],
  loading: false,
  url: '',
}

export const uploadFile = createAsyncThunk(
  'photo/uploadFile',
  async (file: File) => {
    const liff = (await import('@line/liff')).default
    await liff.ready
    const profile = await liff.getProfile()
    const uuid = uuidv4()
    const destination = `${profile.userId}/${file.name}`
    await uploadBytes(ref(storage, destination), file)
    const { data } = await backendInstance.put<string>(apiEndpoints.files, {
      ref: destination,
      uuid,
    })
    return data
  },
)

export const fetchFiles = createAsyncThunk('photo/fetchFiles', async () => {
  const { data } = await backendInstance.get<Files[]>(apiEndpoints.files)
  return data
})

export const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchFiles.fulfilled.type,
        (state, action: PayloadAction<Files[]>) => {
          state.value = action.payload
        },
      )
      .addCase(
        uploadFile.fulfilled.type,
        (state, action: PayloadAction<string>) => {
          state.url = action.payload
        },
      )
      .addMatcher(isPending(fetchFiles, uploadFile), (state) => {
        state.loading = true
      })
      .addMatcher(isFulfilled(fetchFiles, uploadFile), (state) => {
        state.loading = false
      })
      .addMatcher(isRejected(fetchFiles, uploadFile), (state) => {
        state.loading = false
      })
  },
})

// export const { } = photoSlice.actions

export default photoSlice.reducer
