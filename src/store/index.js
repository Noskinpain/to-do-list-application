import { configureStore } from "@reduxjs/toolkit";
import {
  todoReducer,
  toggler,
  deleteToggler,
  closeBox,
  updateTodoValue,
  updateTodoTitle,
} from "./slices/todoSlice";
import {
  tagReducer,
  updateTagValue,
  toggleTagBox,
  setSelectedColor,
  UpdateTagTitle,
  resetTag,
} from "./slices/tagSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { tagsApi } from "./apis/tagsApi";

const store = configureStore({
  reducer: {
    todo: todoReducer,
    tag: tagReducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(tagsApi.middleware);
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
};
export { useAddTagMutation, useFetchTagsQuery } from "./apis/tagsApi";
