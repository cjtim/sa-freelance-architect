import { configureStore } from '@reduxjs/toolkit'

import projects from '../slices/projects'
import customers from '../slices/customer'
import furnitures from '../slices/funiture'
import fileList from '../slices/file_list'
import contracts from '../slices/contract'
import projectFurnitures from '../slices/project_furniture'
import _template from '../slices/_template'

export const store = configureStore({
  reducer: {
    projects,
    customers,
    furnitures,
    fileList,
    contracts,
    projectFurnitures,
    _template,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
