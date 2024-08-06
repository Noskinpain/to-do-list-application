import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "./slices/todoSlice";
import { addTodoReducer, toggler } from "./slices/addTodoSlice";



 const store = configureStore({
    reducer: {
        todo: todoReducer,
        toggleTodo: addTodoReducer,
    }
})

export {store, toggler}