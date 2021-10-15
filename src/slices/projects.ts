import backendInstance from '@/lib/axios'
import { v4 as uuidv4 } from 'uuid'
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { apiEndpoints, NEXT_CONFIG } from '@/config'
import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from '@reduxjs/toolkit'

import { Project } from '@/pages/api/entity/project'
import { FileList } from '@/pages/api/entity/file_list'
import { NewRow } from '@/pages/api/interface/common'

if (!getApps().length) {
  initializeApp({
    storageBucket: NEXT_CONFIG.BUCKET_NAME,
    projectId: NEXT_CONFIG.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    apiKey: NEXT_CONFIG.NEXT_PUBLIC_FIREBASE_API_KEY,
  })
}

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(getApp())

interface ProjectState {
  projects: Project[]
  project: Project
  files: FileList[]
  loading: boolean
}

const initialState: ProjectState = {
  projects: [],
  project: {} as Project,
  files: [],
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
    const { data } = await backendInstance.post<any>(
      apiEndpoints.projects,
      project,
    )
    return data
  },
)
export const uploadFile = createAsyncThunk(
  'projects/uploadFile',
  async ({ id, file }: { id: number; file: File }) => {
    const liff = (await import('@line/liff')).default
    await liff.ready
    const profile = await liff.getProfile()
    const uuid = uuidv4()
    const destination = `${profile.userId}/${file.name}`
    await uploadBytes(ref(storage, destination), file)
    const { data } = await backendInstance.put<string>(apiEndpoints.files, {
      id,
      ref: destination,
      uuid,
    })
    return data
  },
)

export const fetchFiles = createAsyncThunk(
  'projects/fetchFiles',
  async (id: number) => {
    const { data } = await backendInstance.get<FileList[]>(apiEndpoints.files, {
      params: { id },
    })
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
          state.projects = action.payload
        },
      )
      .addCase(
        fetchProject.fulfilled.type,
        (state, action: PayloadAction<Project>) => {
          state.project = action.payload
        },
      )
      .addCase(
        fetchFiles.fulfilled.type,
        (state, action: PayloadAction<FileList[]>) => {
          state.files = action.payload
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
