import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const todosApi = createApi({
  reducerPath: "todos",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3006",
  }),
  endpoints(builder) {
    return {
      addTodo: builder.mutation({
        invalidatesTags: [{ type: "Todos" }],
        query: ({ title, description, selectedTags, createdAt }) => {
          return {
            url: "/todos",
            method: "POST",
            body: {
              title,
              description,
              selectedTags,
              createdAt,
            },
          };
        },
      }),
      fetchTodos: builder.query({
        providesTags: [{ type: "Todos" }],
        query: () => {
          return {
            url: "/todos",
            method: "GET",
          };
        },
      }),
      deleteTodo: builder.mutation({
        query: (id) => {
          return {
            url: `/todos/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: [{ type: "Todos" }],
      }),
      deleteAllTodos: builder.mutation({
        queryFn: async (_arg, _queryApi, _extraOptions, baseQuery) => {
          // First, fetch all todos
          const todosResult = await baseQuery({ url: "/todos", method: "GET" });

          if (todosResult.error) {
            return { error: todosResult.error };
          }

          const todos = todosResult.data;

          // Then, delete each todo one by one
          for (const todo of todos) {
            const deleteResult = await baseQuery({
              url: `/todos/${todo.id}`,
              method: "DELETE",
            });

            if (deleteResult.error) {
              return { error: deleteResult.error };
            }
          }

          return { data: "All todos deleted" };
        },
        invalidatesTags: [{ type: "Todos" }],
      }),
      updateTodo: builder.mutation({
        query: ({ id, ...updatedTodo }) => ({
          url: `/todos/${id}`,
          method: 'PATCH', // or 'PATCH' depending on your needs
          body: updatedTodo,
        }),
        invalidatesTags: [{ type: 'Todos' }],
      }),
      
    };
  },
});

export const {
  useAddTodoMutation,
  useFetchTodosQuery,
  useDeleteTodoMutation,
  useDeleteAllTodosMutation,
  useUpdateTodoMutation
} = todosApi;
export { todosApi };
