import { createSlice } from "@reduxjs/toolkit";



const todoSlice = createSlice({
    name: "todos",
    initialState: {
        tags: [],
    }
})


export const todoReducer = todoSlice.reducer