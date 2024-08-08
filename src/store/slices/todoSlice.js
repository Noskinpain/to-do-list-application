import { createSlice } from "@reduxjs/toolkit";



const todoSlice = createSlice({
    name: "todos",
    initialState: {
        isBoxOpen: false,
        isDeleteBoxOpen: false,
        todoSearchValue: "",
        todoTitle: ""
    },
    reducers: {
      toggler(state) {
        state.isBoxOpen = !state.isBoxOpen;
      },
      deleteToggler(state){
          state.isDeleteBoxOpen = !state.isDeleteBoxOpen
      },
      closeBox(state) {
        state.isDeleteBoxOpen = false;
      },
      updateTodoValue(state, action){
      state.todoSearchValue = action.payload
      },
    updateTodoTitle(state, action){
      state.todoTitle = action.payload
    } 
    
    },
})

export const {toggler, deleteToggler, closeBox, updateTodoValue, updateTodoTitle} = todoSlice.actions
export const todoReducer = todoSlice.reducer