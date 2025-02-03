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


import { createApi } from '@reduxjs/toolkit/query/react';

// Available pizza sizes and toppings
export const PIZZA_SIZES = ['S', 'M', 'L', 'XL'];
export const PIZZA_TOPPINGS = [
  'Pepperoni',
  'Mushrooms',
  'Onions',
  'Sausage',
  'Bell Peppers',
  'Olives',
  'Extra Cheese',
  'Bacon'
];

// Mock data
const mockOrders = [
  {
    id: 1,
    customer: 'John Doe',
    size: 'L',
    toppings: ['Pepperoni', 'Mushrooms'],
    timestamp: new Date().toISOString()
  },
  {
    id: 2,
    customer: 'Jane Smith',
    size: 'M',
    toppings: ['Olives', 'Bell Peppers'],
    timestamp: new Date().toISOString()
  },
  {
    id: 3,
    customer: 'Bob Wilson',
    size: 'S',
    toppings: ['Pepperoni', 'Extra Cheese'],
    timestamp: new Date().toISOString()
  }
];

let orders = [...mockOrders];
let nextId = 4;

// Create the API
export const pizzaApi = createApi({
  reducerPath: 'pizzaApi',
  baseQuery: () => ({ data: null }),
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    getOrders: builder.query({
      queryFn: () => ({ data: orders }),
      providesTags: ['Orders'],
    }),
    createOrder: builder.mutation({
      queryFn: (newOrder) => {
        try {
          const order = {
            id: nextId++,
            customer: newOrder.fullName,
            size: newOrder.size,
            toppings: newOrder.toppings || [],
            timestamp: new Date().toISOString()
          };
          orders = [order, ...orders];
          return { data: order };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
} = pizzaApi;
