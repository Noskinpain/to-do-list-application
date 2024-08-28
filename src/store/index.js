import { configureStore } from "@reduxjs/toolkit";
import {
  todoReducer,
  toggler,
  deleteToggler,
  closeBox,
  updateTodoValue,
  updateTodoTitle,
  updateTodoDescription,
  resetTodo,
} from "./slices/todoSlice";
import {
  tagReducer,
  updateTagValue,
  toggleTagBox,
  setSelectedColor,
  UpdateTagTitle,
  resetTag
} from "./slices/tagSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { tagsApi } from "./apis/tagsApi";
import { todosApi } from "./apis/todosApi";

const store = configureStore({
  reducer: {
    todo: todoReducer,
    tag: tagReducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
    [todosApi.reducerPath]: todosApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(tagsApi.middleware)
      .concat(todosApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  store,
  toggler,
  deleteToggler,
  closeBox,
  updateTagValue,
  updateTodoValue,
  toggleTagBox,
  setSelectedColor,
  UpdateTagTitle,
  updateTodoTitle,
  resetTag,
  updateTodoDescription,
  resetTodo,
};
export {
  useAddTagMutation,
  useFetchTagsQuery,
  useDeleteTagsMutation,
} from "./apis/tagsApi";
export {
  useAddTodoMutation,
  useFetchTodosQuery,
  useDeleteTodoMutation,
  useDeleteAllTodosMutation,
  useUpdateTodoMutation,
} from "./apis/todosApi";
