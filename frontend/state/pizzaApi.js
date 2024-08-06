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

// // import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

// // // Define your API service using the createApi function
// // export const pizzaApi = createApi({
// //   // A unique key to mount the API reducer under in your store
// //   reducerPath: 'pizzaApi',
// //   // Configure the base URL for your API endpoints
// //   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api/' }),
// //   // Define your endpoints
// //   endpoints: (builder) => ({
// //     // A query endpoint to fetch the list of orders
// //     getOrders: builder.query({
// //       // The query function returns the URL for the GET request
// //       query: () => 'pizza/history', // No need to include the full URL here, just the path after the baseUrl
// //     }),
// //     // A mutation endpoint to toggle an order (if needed)
// //     toggleOrder: builder.mutation({
// //       // You would define the query and body for the toggleOrder mutation here
// //       // Since the details are not provided, this is left as a placeholder
// //     }),
// //     // A mutation endpoint to create a new order
// //     createOrder: builder.mutation({
// //       // You would define the query and body for the createOrder mutation here
// //       // Since the details are not provided, this is left as a placeholder
// //     }),
// //   }),
// // });

// // // Export the auto-generated hooks for each endpoint
// // export const {
// //   useGetOrdersQuery,
// //   useToggleOrderMutation,
// //   useCreateOrderMutation,
// // } = pizzaApi;

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

// export const pizzaApi = createApi({
//   reducerPath: 'pizzaApi',
//   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api/' }),
//   endpoints: (builder) => ({
//     getOrders: builder.query({
//       query: () => 'pizza/history',
//     }),
//     createOrder: builder.mutation({
//       query: (newOrder) => ({
//         url: 'pizza/order',
//         method: 'POST',
//         body: newOrder,
//       }),
//     }),
//   }),
// });

// export const { useGetOrdersQuery, useCreateOrderMutation } = pizzaApi;

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
