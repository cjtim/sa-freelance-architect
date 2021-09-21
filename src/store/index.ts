import { configureStore } from '@reduxjs/toolkit'
import PhotoReducer from '../slices/photos'

export const store = configureStore({
  reducer: {
    photos: PhotoReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
