import backendInstance from '@/lib/axios'

import { v4 as uuidv4 } from 'uuid'
import { Photo } from '@API/entity/photo'
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
interface PhotoState {
  value: Photo[]
  loading: boolean
  url: string
}

// Define the initial state using that type
const initialState: PhotoState = {
  value: [],
  loading: false,
  url: '',
}

export const uploadFile = createAsyncThunk(
  'photo/uploadFile',
  async (file: File) => {
    const uuid = uuidv4()
    const destination = `test/${file.name}`
    await uploadBytes(ref(storage, destination), file)
    const { data } = await backendInstance.put<string>(apiEndpoints.files, {
      ref: destination,
      uuid,
    })
    return data
  },
)

export const fetchPhotos = createAsyncThunk('photo/fetchPhotos', async () => {
  const { data } = await backendInstance.get<Photo[]>(apiEndpoints.photos)
  return data
})

export const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchPhotos.fulfilled.type,
        (state, action: PayloadAction<Photo[]>) => {
          state.value = action.payload
        },
      )
      .addCase(
        uploadFile.fulfilled.type,
        (state, action: PayloadAction<string>) => {
          state.url = action.payload
        },
      )
      .addMatcher(isPending(fetchPhotos, uploadFile), (state) => {
        state.loading = true
      })
      .addMatcher(isFulfilled(fetchPhotos, uploadFile), (state) => {
        state.loading = false
      })
      .addMatcher(isRejected(fetchPhotos, uploadFile), (state) => {
        state.loading = false
      })
  },
})

// export const { } = photoSlice.actions

export default photoSlice.reducer
