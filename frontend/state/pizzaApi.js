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

// Mock data with realistic orders
const mockOrders = [
  {
    id: 1,
    customer: 'John Doe',
    size: 'L',
    toppings: ['Pepperoni', 'Mushrooms', 'Extra Cheese'],
    timestamp: '2024-02-10T14:30:00Z'
  },
  {
    id: 2,
    customer: 'Jane Smith',
    size: 'M',
    toppings: ['Olives', 'Bell Peppers', 'Onions'],
    timestamp: '2024-02-10T14:15:00Z'
  },
  {
    id: 3,
    customer: 'Bob Wilson',
    size: 'L',
    toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Extra Cheese'],
    timestamp: '2024-02-10T14:00:00Z'
  }
];

let nextId = 4;
let orders = [...mockOrders];

// Dummy base query that always returns success
const dummyBaseQuery = fetchBaseQuery({
  baseUrl: '/',
});

export const pizzaApi = createApi({
  reducerPath: 'pizzaApi',
  baseQuery: dummyBaseQuery,
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    getOrders: builder.query({
      queryFn: () => {
        return { data: orders };
      },
      providesTags: ['Orders'],
    }),
    createOrder: builder.mutation({
      queryFn: (newOrder) => {
        if (!newOrder.fullName?.trim()) {
          throw new Error('Full name is required');
        }
        if (!newOrder.size) {
          throw new Error('Size is required');
        }
        if (!newOrder.toppings?.length) {
          throw new Error('At least one topping is required');
        }

        const order = {
          id: nextId++,
          customer: newOrder.fullName.trim(),
          size: newOrder.size,
          toppings: newOrder.toppings,
          timestamp: new Date().toISOString()
        };

        orders = [order, ...orders];
        return { data: order };
      },
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
} = pizzaApi;
