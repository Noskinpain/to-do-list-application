import { configureStore } from "@reduxjs/toolkit";
import { todoReducer, toggler, deleteToggler, closeBox, updateTagValue, updateTodoValue} from "./slices/todoSlice";
import { addTodoReducer } from "./slices/addTodoSlice";



 const store = configureStore({
    reducer: {
        todo: todoReducer,
        toggleTodo: addTodoReducer,
    }
})

export {store, toggler, deleteToggler, closeBox, updateTagValue, updateTodoValue}