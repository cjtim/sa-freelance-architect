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

import { Contract } from '@/pages/api/entity'

interface ContractState {
  contracts: Contract[]
  contractByProject: Contract
  loading: boolean
}

const initialState: ContractState = {
  contracts: [],
  contractByProject: {} as Contract,
  loading: false,
}

export const fetchContracts = createAsyncThunk(
  'contracts/fetchContracts',
  async () => {
    const { data } = await backendInstance.get<Contract[]>(
      apiEndpoints.contracts,
    )
    return data
  },
)

export const fetchContractByProject = createAsyncThunk(
  'contracts/fetchContract',
  async (project_id: number) => {
    const params = { project_id }
    const { data } = await backendInstance.get<Contract>(
      apiEndpoints.contracts,
      {
        params,
      },
    )
    return data
  },
)

export const upsertContract = createAsyncThunk(
  'contracts/createContract',
  async (project: Contract) => {
    const { data } = await backendInstance.post<Contract>(
      apiEndpoints.contracts,
      project,
    )
    return data
  },
)

export const contractSlice = createSlice({
  name: 'contracts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchContracts.fulfilled.type,
        (state, action: PayloadAction<Contract[]>) => {
          state.contracts = action.payload
        },
      )
      .addCase(
        fetchContractByProject.fulfilled.type,
        (state, action: PayloadAction<Contract>) => {
          state.contractByProject = action.payload
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

export default contractSlice.reducer
