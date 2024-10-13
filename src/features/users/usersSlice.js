import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = 'http://localhost:3500/users'

const initialState = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(USERS_URL)
    if (response.data) {
        return [...response.data];
    } else {

        return response.status.massage
    }
})

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            console.log(action)
            return action.payload
        })
    }
})

export const selectAllUsers = (state) => state.users;

export const selectUserById = (state, userId) => state.users.find(user => user.id === userId)


export default usersSlice.reducer