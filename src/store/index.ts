import { configureStore } from '@reduxjs/toolkit'

import ProjectReducer from '../slices/projects'
import CustomerReducer from '../slices/customer'
import FurnitureReducer from '../slices/funiture'
import FileListReducer from '../slices/file_list'
import ContractReducer from '../slices/contract'
import ProjectFurnitureReducer from '../slices/project_furniture'

export const store = configureStore({
  reducer: {
    projects: ProjectReducer,
    customers: CustomerReducer,
    furnitures: FurnitureReducer,
    fileList: FileListReducer,
    contracts: ContractReducer,
    projectFurnitures: ProjectFurnitureReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
