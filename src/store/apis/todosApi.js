import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";


const todosApi = createApi({
    reducerPath: "todos",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3006"
    }),
    endpoints(builder){
        return{
            addTodo: builder.mutation({
                invalidatesTags: [{type: "Todos"}],
            query: ({title, description, selectedTags, createdAt}) => {
                return{
                    url: "/todos",
                    method: "POST",
                    body: {
                       title,
                       description,
                       selectedTags,
                       createdAt
                    }
                }
            }
            }),
            fetchTodos: builder.query({
                providesTags: [{type: "Todos"}],
                query: () => {
                    return{
                        url: "/todos",
                        method: "GET"
                    }
                }
            }),
        }
    }
})
export const {useAddTodoMutation, useFetchTodosQuery} = todosApi
export {todosApi}