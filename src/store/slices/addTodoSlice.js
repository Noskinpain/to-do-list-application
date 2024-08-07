import { createSlice } from "@reduxjs/toolkit";

const addTodoSlice = createSlice({
  name: "addTodo",
  initialState: {
   tags: [],
  }
});


export const addTodoReducer = addTodoSlice.reducer;
