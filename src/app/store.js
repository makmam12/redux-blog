import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../features/counter/counterSlice'
import postsReducer from '../features/posts/postsSlice'
import usersSlice from "../features/users/usersSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        posts: postsReducer, 
        users: usersSlice,
    }
})