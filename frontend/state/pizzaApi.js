// import { createApi, fakeBaseQuery, fetchBaseQuery } from "@reduxjs/toolkit/query";


// export const pizzaApi = createApi ({
//     reducerPath: "pizzaApi",
//     baseQuery: fetchBaseQuery({baseUrl: "http://localhost:9009/api/"}),
//     endpoints: build => ({
//         getOrders: build.query ({
//             query: () => "http://localhost:9009/api/pizza/history"//check on a shorter route.
//         }),
//         toggleOrder: build.mutation ({

//         }),
//         createOrder: build.mutation ({

//         })
//     })
// })

// export const {
// useGetOrdersQuery,
// useToggleOrderMutation,
// useCreateOrderMutation,
// } = pizzaApi


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Mock data for static deployment
const mockOrders = [
  { id: 1, customer: 'John Doe', size: 'L', toppings: ['Pepperoni', 'Mushrooms'] },
  { id: 2, customer: 'Jane Smith', size: 'M', toppings: ['Olives', 'Bell Peppers', 'Onions'] },
  { id: 3, customer: 'Bob Wilson', size: 'S', toppings: ['Pepperoni', 'Onions'] },
];

let nextId = 4;
let orders = [...mockOrders];

export const pizzaApi = createApi({
  reducerPath: "pizzaApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: "pizza/history",
        method: "GET",
        validateStatus: () => true // Always return success for mock data
      }),
      // Override queryFn to use mock data instead of making HTTP request
      queryFn: () => {
        return { data: orders };
      },
      providesTags: ["Orders"]
    }),
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: "pizza/order",
        method: "POST",
        body: newOrder,
        validateStatus: () => true // Always return success for mock data
      }),
      // Override queryFn to use mock data instead of making HTTP request
      queryFn: (newOrder) => {
        // Validate required fields
        if (!newOrder.fullName) {
          return {
            error: { status: 400, data: { message: 'Full name is required' } }
          };
        }
        if (!newOrder.size) {
          return {
            error: { status: 400, data: { message: 'Pizza size is required' } }
          };
        }
        if (!newOrder.toppings || newOrder.toppings.length === 0) {
          return {
            error: { status: 400, data: { message: 'At least one topping is required' } }
          };
        }

        // Create new order
        const order = {
          id: nextId++,
          customer: newOrder.fullName,
          size: newOrder.size,
          toppings: newOrder.toppings,
          timestamp: new Date().toISOString()
        };

        // Add to mock database
        orders = [order, ...orders];

        return {
          data: {
            success: true,
            message: 'Order created successfully',
            order
          }
        };
      },
      invalidatesTags: ["Orders"]
    })
  })
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation
} = pizzaApi;
