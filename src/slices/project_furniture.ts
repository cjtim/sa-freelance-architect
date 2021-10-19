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

import { Furniture, ProjectFurniture } from '@/pages/api/entity'
import { NewRow } from '@/pages/api/interface/common'

interface ProjectFurnitureState {
  projectFurnitures: ProjectFurniture[]
  loading: boolean
}

const initialState: ProjectFurnitureState = {
  projectFurnitures: [],
  loading: false,
}

export const fetchProjectFurnitures = createAsyncThunk(
  'projectFurnitures/fetchProjectFurnitures',
  async (project_id: number) => {
    const params = { project_id }
    const { data } = await backendInstance.get<ProjectFurniture[]>(
      apiEndpoints.projectFurnitures,
      { params },
    )
    return data
  },
)

export const upsertProjectFurnitures = createAsyncThunk(
  'projectFurnitures/upsertProjectFurnitures',
  async ({
    projectFurnitures,
    project_id,
  }: {
    projectFurnitures: ProjectFurniture[]
    project_id: number
  }) => {
    const furniture_ids = projectFurnitures.map((i) => i.furniture.furniture_id)
    const body = { project_id, furniture_ids }
    const { data } = await backendInstance.post<any>(
      apiEndpoints.projectFurnitures,
      body,
    )
    return data
  },
)

export const projectFurnitureSlice = createSlice({
  name: 'projectFurnitures',
  initialState,
  reducers: {
    add: (
      state,
      action: PayloadAction<{
        project_id: number
        furniture_ids: number[]
        furnitures: Furniture[]
      }>,
    ) => {
      const { furniture_ids, project_id, furnitures } = action.payload
      const projectFurnitureNew: any[] = furniture_ids
        .map(
          (i) =>
            ({
              furniture: furnitures.find((j) => j.furniture_id === i),
              project: { project_id },
            } as ProjectFurniture),
        )
        .filter((i) => i !== undefined)
      state.projectFurnitures.push(...projectFurnitureNew)
    },
    delete: (state, action: PayloadAction<number>) => {
      state.projectFurnitures = state.projectFurnitures.filter(
        (i) => i.furniture?.furniture_id !== action.payload,
      )
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchProjectFurnitures.fulfilled.type,
        (state, action: PayloadAction<ProjectFurniture[]>) => {
          state.projectFurnitures = action.payload
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

export const {
  add: ProjectFurnitureAdd,
  delete: ProjectFurnitureDelete,
} = projectFurnitureSlice.actions

export default projectFurnitureSlice.reducer
