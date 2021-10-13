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

import { Customer } from '@/pages/api/entity'
import { NewRow } from '@/pages/api/interface/common'

interface CustomerState {
  customers: Customer[]
  customer: Customer
  loading: boolean
}

const initialState: CustomerState = {
  customers: [],
  customer: {} as Customer,
  loading: false,
}

export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async () => {
    const { data } = await backendInstance.get<Customer[]>(
      apiEndpoints.customers,
    )
    return data
  },
)

export const fetchCustomer = createAsyncThunk(
  'customer/fetchCustomer',
  async (id: number) => {
    const params = { id }
    const { data } = await backendInstance.get<Customer>(
      apiEndpoints.customers,
      {
        params,
      },
    )
    return data
  },
)

export const createProject = createAsyncThunk(
  'customer/createProject',
  async (project: NewRow<Customer>) => {
    const { data } = await backendInstance.post<any>(
      apiEndpoints.customers,
      project,
    )
    return data
  },
)

export const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchCustomers.fulfilled.type,
        (state, action: PayloadAction<Customer[]>) => {
          state.customers = action.payload
        },
      )
      .addCase(
        fetchCustomer.fulfilled.type,
        (state, action: PayloadAction<Customer>) => {
          state.customer = action.payload
        },
      )
      .addMatcher(
        isPending(fetchCustomers, fetchCustomer, createProject),
        (state) => {
          state.loading = true
        },
      )
      .addMatcher(
        isFulfilled(fetchCustomers, fetchCustomer, createProject),
        (state) => {
          state.loading = false
        },
      )
      .addMatcher(
        isRejected(fetchCustomers, fetchCustomer, createProject),
        (state) => {
          state.loading = false
        },
      )
  },
})

// export const { } = photoSlice.actions

export default customerSlice.reducer
