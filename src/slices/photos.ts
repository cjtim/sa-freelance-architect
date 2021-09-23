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

if (!getApps().length) {
  initializeApp({
    storageBucket: 'sa-freelance-d880a.appspot.com',
    projectId: 'sa-freelance-d880a',
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
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
    const userRef = ref(storage, destination)
    await uploadBytes(userRef, file)
    const { data } = await backendInstance.put<string>('/api/files', {
      ref: destination,
      uuid,
    })
    return data
  },
)

export const fetchPhotos = createAsyncThunk('photo/fetchPhotos', async () => {
  const { data } = await backendInstance.get<Photo[]>('/api/db')
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
