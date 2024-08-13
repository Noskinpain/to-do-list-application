import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration)
    })
}
const tagsApi = createApi({
  reducerPath: "tags",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3006",
    fetchFn: async(...args) => {
        await pause(1000)
        return fetch(...args)
      }
  }),
  tagTypes: ['Tags'], // You should declare the tagTypes that you're using
  endpoints(builder) {
    return {
      addTag: builder.mutation({
        invalidatesTags: [{ type: 'Tags' }], // Invalidate all Tags on add
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
        providesTags: (result) =>
          // If the result is undefined or an empty array, return an empty array
          result ? 
          [
            // Return a 'Tags' object for each tag retrieved from the server
            ...result.map(({ id }) => ({ type: 'Tags', id })),
            { type: 'Tags' }
          ] : 
          [{ type: 'Tags' }],
        query: () => {
          return {
            url: "/tags",
            method: "GET",
          };
        },
      }),
      deleteTags: builder.mutation({
        invalidatesTags: (result, error, { id }) => [{ type: 'Tags', id }],
        query: ({ id }) => ({
          url: `/tags/${id}`,
          method: "DELETE",
        }),
      }),
    };
  },
});

export const { useAddTagMutation, useFetchTagsQuery, useDeleteTagsMutation } = tagsApi;
export { tagsApi };
