import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tagsApi = createApi({
  reducerPath: "tags",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3006",
  }),
  endpoints(builder) {
    return {
      addTag: builder.mutation({
        query: ({ name, color }) => {
          return {
            url: "/tags",
            method: "POST",
            body: {
              name,
              color,
            },
          };
        },
      }),
      fetchTags: builder.query({
        query: () => {
            return{
                url: "/tags",
                method: "GET"
            }
        }
      })
    };
  },
});

export const { useAddTagMutation, useFetchTagsQuery } = tagsApi;
export { tagsApi };
