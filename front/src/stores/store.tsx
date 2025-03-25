import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import couponReducer from "./slices/couponSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    coupon: couponReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
