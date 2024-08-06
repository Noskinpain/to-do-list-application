import { createSlice } from "@reduxjs/toolkit";

const addTodoSlice = createSlice({
  name: "addTodo",
  initialState: {
    isBoxOpen: false,
  },
  reducers: {
    toggler(state, action) {
      state.isBoxOpen = !state.isBoxOpen;
    },
  },
});

export const { toggler } = addTodoSlice.actions;
export const addTodoReducer = addTodoSlice.reducer;
