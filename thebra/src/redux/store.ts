import { configureStore } from '@reduxjs/toolkit'
import { getTokenReducer } from './reducers/getTokenReducer'
import { getProductsReducer } from './reducers/getProductsReducer'
import getProductByIdReducer from './reducers/getProductByIdReducer'
import { cartReducer } from './reducers/cartReducer'

export const store = configureStore({
  reducer: {
    token: getTokenReducer,
    products: getProductsReducer,
    productById: getProductByIdReducer,
    cart: cartReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch