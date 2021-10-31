import backendInstance from '@/lib/axios'
import { apiEndpoints } from '@/config'
import { AnyAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchSth = createAsyncThunk('contracts/fetchSth', async () => {
  const { data } = await backendInstance.get(apiEndpoints.contracts)
  return data
})

export const contractSlice = createSlice({
  name: 'contracts',
  initialState: {
    data: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSth.fulfilled.type, (state, action: AnyAction) => {
      state.data = action.payload
    })
  },
})

// export const { } = photoSlice.actions

export default contractSlice.reducer
