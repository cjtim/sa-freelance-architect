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

import { Furniture } from '@/pages/api/entity'
import { NewRow } from '@/pages/api/interface/common'

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
  async (project: NewRow<Furniture>) => {
    const { data } = await backendInstance.post<any>(
      apiEndpoints.furnitures,
      project,
    )
    return data
  },
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
      .addMatcher(
        isPending(fetchFurnitures, fetchFurniture, createFurniture),
        (state) => {
          state.loading = true
        },
      )
      .addMatcher(
        isFulfilled(fetchFurnitures, fetchFurniture, createFurniture),
        (state) => {
          state.loading = false
        },
      )
      .addMatcher(
        isRejected(fetchFurnitures, fetchFurniture, createFurniture),
        (state) => {
          state.loading = false
        },
      )
  },
})

// export const { } = photoSlice.actions

export default furnitureSlice.reducer