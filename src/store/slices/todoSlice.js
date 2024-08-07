import { createSlice } from "@reduxjs/toolkit";



const todoSlice = createSlice({
    name: "todos",
    initialState: {
        isBoxOpen: false,
        isDeleteBoxOpen: false,
        todoSearchValue: "",
        tagsSearchValue: "",
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
      updateTagValue(state, action){
      state.tagsSearchValue = action.payload
      }
    
    },
})

export const {toggler, deleteToggler, closeBox, updateTagValue, updateTodoValue} = todoSlice.actions
export const todoReducer = todoSlice.reducer