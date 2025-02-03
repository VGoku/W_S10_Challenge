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
  { id: 1, customer: 'John Doe', size: 'L', toppings: ['1', '2'] },
  { id: 2, customer: 'Jane Smith', size: 'M', toppings: ['3', '4', '5'] },
  { id: 3, customer: 'Bob Wilson', size: 'S', toppings: ['1', '5'] },
];

let nextId = 4;
let orders = [...mockOrders];

export const pizzaApi = createApi({
  reducerPath: "pizzaApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    getOrders: builder.query({
      queryFn: () => {
        return { data: orders };
      },
      providesTags: ["Orders"]
    }),
    createOrder: builder.mutation({
      queryFn: (newOrder) => {
        if (!newOrder.fullName) {
          return {
            error: { data: { message: 'fullName is required' } }
          };
        }
        if (!newOrder.size) {
          return {
            error: { data: { message: 'size is required' } }
          };
        }
        const order = {
          id: nextId++,
          customer: newOrder.fullName,
          size: newOrder.size,
          toppings: newOrder.toppings
        };
        orders = [order, ...orders];
        return { data: order };
      },
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
} = pizzaApi;
