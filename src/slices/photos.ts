import { Photo } from '@/pages/api/entity/photo'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

// Define a type for the slice state
interface PhotoState {
  value: Photo[]
}

// Define the initial state using that type
const initialState: PhotoState = {
  value: [],
}

export const fetchPhotos = createAsyncThunk('photo/fetchPhotos', async () => {
  const { data } = await axios.get<Photo[]>('/api/db')
  return data
})

export const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchPhotos.fulfilled.type,
      (state, action: PayloadAction<Photo[]>) => {
        state.value = action.payload
      },
    )
  },
})

// export const { } = photoSlice.actions

export default photoSlice.reducer
