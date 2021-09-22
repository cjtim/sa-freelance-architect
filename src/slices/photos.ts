import backendInstance from '@/lib/axios'
import { Photo } from '@API/entity/photo'
import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  PayloadAction,
} from '@reduxjs/toolkit'

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
  async (file: any) => {
    const formData = new FormData()
    formData.append('file', file, file.name)
    const { data } = await backendInstance.post<string>('/api/files', formData)
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
  },
})

// export const { } = photoSlice.actions

export default photoSlice.reducer
