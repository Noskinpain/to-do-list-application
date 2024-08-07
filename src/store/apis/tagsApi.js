import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const tagsApi = createApi({
    reducerPath: "tags",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3006"
    }),
    endpoints(builder){
        return{
            addTag: builder.mutation({
                query: () => {
                    return{
                        url: "/tags",
                        method: "POST",
                        body: {
                            
                        }
                    }
                }
            })
        }
    }
})