import { configureStore } from '@reduxjs/toolkit'

import ProjectReducer from '../slices/projects'
import CustomerReducer from '../slices/customer'

export const store = configureStore({
  reducer: {
    projects: ProjectReducer,
    customers: CustomerReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
