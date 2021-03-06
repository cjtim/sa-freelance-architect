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

import { Furniture } from '@/pages/api/entity'
import { getBucket } from '@/lib/firebase'
import { ref, uploadBytes } from 'firebase/storage'

interface FurnitureState {
  furnitures: Furniture[]
  furniture: Furniture
  loading: boolean
}

const initialState: FurnitureState = {
  furnitures: [],
  furniture: {} as Furniture,
  loading: false,
}

export const fetchFurnitures = createAsyncThunk(
  'furnitures/fetchFurnitures',
  async () => {
    const { data } = await backendInstance.get<Furniture[]>(
      apiEndpoints.furnitures,
    )
    return data
  },
)

export const fetchFurniture = createAsyncThunk(
  'furnitures/fetchFurniture',
  async (id: number) => {
    const params = { id }
    const { data } = await backendInstance.get<Furniture>(
      apiEndpoints.furnitures,
      {
        params,
      },
    )
    return data
  },
)

export const createFurniture = createAsyncThunk(
  'furnitures/createFurniture',
  async ({ furniture, file }: { furniture: Furniture; file: File }) => {
    const storage = getBucket()
    const uuid = uuidv4()
    const location = `furnitures/${uuid}-${file.name}`
    await uploadBytes(ref(storage, location), file)

    const { data } = await backendInstance.post<Furniture>(
      apiEndpoints.furnitures,
      { furniture, ref: location },
    )
    return data
  },
)

export const deleteFurniture = createAsyncThunk(
  'furnitures/deleteFurniture',
  async (furniture_id: number) =>
    backendInstance.delete(apiEndpoints.furnitures, {
      data: { furniture_id },
    }),
)

export const furnitureSlice = createSlice({
  name: 'furnitures',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchFurnitures.fulfilled.type,
        (state, action: PayloadAction<Furniture[]>) => {
          state.furnitures = action.payload
        },
      )
      .addCase(
        fetchFurniture.fulfilled.type,
        (state, action: PayloadAction<Furniture>) => {
          state.furniture = action.payload
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

export default furnitureSlice.reducer
