// // import { createApi, fakeBaseQuery, fetchBaseQuery } from "@reduxjs/toolkit/query";


// // export const pizzaApi = createApi ({
// //     reducerPath: "pizzaApi",
// //     baseQuery: fetchBaseQuery({baseUrl: "http://localhost:9009/api/"}),
// //     endpoints: build => ({
// //         getOrders: build.query ({
// //             query: () => "http://localhost:9009/api/pizza/history"//check on a shorter route.
// //         }),
// //         toggleOrder: build.mutation ({

// //         }),
// //         createOrder: build.mutation ({

// //         })
// //     })
// // })

// // export const {
// // useGetOrdersQuery,
// // useToggleOrderMutation,
// // useCreateOrderMutation,
// // } = pizzaApi


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pizzaApi = createApi({
  reducerPath: "pizzaApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9009/api/" }),
  endpoints: (build) => ({
    getOrders: build.query({
      query: () => "pizza/history", // Base URL already defined
    }),
    createOrder: build.mutation({
      query: (newOrder) => ({
        url: "pizza/order",
        method: "POST",
        body: newOrder,
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
} = pizzaApi;
