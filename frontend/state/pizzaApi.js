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


import { createApi } from "@reduxjs/toolkit/query/react";

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
  baseQuery: () => ({ data: null }), // Dummy base query since we're using queryFn
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    getOrders: builder.query({
      queryFn: () => {
        try {
          return {
            data: {
              success: true,
              orders: orders,
              message: 'Orders retrieved successfully'
            }
          };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: { message: 'Failed to retrieve orders' }
            }
          };
        }
      },
      providesTags: ["Orders"]
    }),
    createOrder: builder.mutation({
      queryFn: (newOrder) => {
        try {
          // Validate required fields
          if (!newOrder.fullName) {
            return {
              error: {
                status: 400,
                data: { message: 'Full name is required' }
              }
            };
          }
          if (!newOrder.size) {
            return {
              error: {
                status: 400,
                data: { message: 'Pizza size is required' }
              }
            };
          }
          if (!newOrder.toppings || newOrder.toppings.length === 0) {
            return {
              error: {
                status: 400,
                data: { message: 'At least one topping is required' }
              }
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
        } catch (error) {
          return {
            error: {
              status: 500,
              data: { message: 'Failed to create order' }
            }
          };
        }
      },
      invalidatesTags: ["Orders"]
    })
  })
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation
} = pizzaApi;
