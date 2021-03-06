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

import { Project } from '@/pages/api/entity/project'
import { sortBy } from '@/utils/sort'

interface ProjectState {
  projects: Project[]
  project: Project
  loading: boolean
}

const initialState: ProjectState = {
  projects: [],
  project: {} as Project,
  loading: false,
}

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async () => {
    const { data } = await backendInstance.get<Project[]>(apiEndpoints.projects)
    return data
  },
)

export const fetchProject = createAsyncThunk(
  'projects/fetchProject',
  async (id: number) => {
    const params = { id }
    const { data } = await backendInstance.get<Project>(apiEndpoints.projects, {
      params,
    })
    return data
  },
)

export const createProject = createAsyncThunk(
  'projects/createProject',
  async (project: Project) => {
    const { data } = await backendInstance.post<Project>(
      apiEndpoints.projects,
      project,
    )
    return data
  },
)

export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async (project: Project) => {
    const { data } = await backendInstance.put<Project>(
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
        fetchProjects.fulfilled.type,
        (state, action: PayloadAction<Project[]>) => {
          state.projects = sortBy(action.payload, 'created_at')
        },
      )
      .addCase(
        fetchProject.fulfilled.type,
        (state, action: PayloadAction<Project>) => {
          state.project = action.payload
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

export default projectsSlice.reducer
