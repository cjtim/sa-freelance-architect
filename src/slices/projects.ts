import backendInstance from '@/lib/axios'

import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from '@reduxjs/toolkit'
import { apiEndpoints } from '@/config'
import { Projects } from '@/pages/api/entity/projects'

interface ProjectState {
  projects: Projects[]
  loading: boolean
}

const initialState: ProjectState = {
  projects: [],
  loading: false,
}

export const fetchProject = createAsyncThunk(
  'projects/fetchProject',
  async () => {
    const { data } = await backendInstance.get<Projects[]>(
      apiEndpoints.projects,
    )
    return data
  },
)
export const createProject = createAsyncThunk(
  'projects/createProject',
  async (project: Omit<Projects, 'id' | 'createdAt' | 'updatedAt'>) => {
    const { data } = await backendInstance.post<any>(
      apiEndpoints.projects,
      project,
    )
    return data
  },
)

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchProject.fulfilled.type,
        (state, action: PayloadAction<Projects[]>) => {
          state.projects = action.payload
        },
      )
      .addMatcher(isPending(fetchProject, createProject), (state) => {
        state.loading = true
      })
      .addMatcher(isFulfilled(fetchProject, createProject), (state) => {
        state.loading = false
      })
      .addMatcher(isRejected(fetchProject, createProject), (state) => {
        state.loading = false
      })
  },
})

// export const { } = photoSlice.actions

export default projectsSlice.reducer
