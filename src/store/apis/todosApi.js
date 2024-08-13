import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";


const todosApi = createApi({
    reducerPath: "todos",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3006"
    }),
    endpoints(builder){
        return{
            addTodo: builder.mutation({
            query: ({title, description, selectedTags}) => {
                return{
                    url: "/todos",
                    method: "POST",
                    body: {
                       title,
                       description,
                       selectedTags
                    }
                }
            }
            }),
            fetchTodos: builder.query({
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