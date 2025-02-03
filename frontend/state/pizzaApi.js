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
    timestamp: '2024-02-10T14:30:00Z',
    status: 'completed'
  },
  {
    id: 2,
    customer: 'Jane Smith',
    size: 'M',
    toppings: ['Olives', 'Bell Peppers', 'Onions'],
    timestamp: '2024-02-10T14:15:00Z',
    status: 'in_progress'
  },
  {
    id: 3,
    customer: 'Bob Wilson',
    size: 'XL',
    toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Extra Cheese'],
    timestamp: '2024-02-10T14:00:00Z',
    status: 'completed'
  }
];

let nextId = 4;
let orders = [...mockOrders];

// Helper function to validate order
const validateOrder = (order) => {
  const errors = [];

  if (!order.fullName?.trim()) {
    errors.push('Full name is required');
  }

  if (!order.size) {
    errors.push('Pizza size is required');
  } else if (!PIZZA_SIZES.includes(order.size)) {
    errors.push(`Invalid pizza size. Must be one of: ${PIZZA_SIZES.join(', ')}`);
  }

  if (!order.toppings || order.toppings.length === 0) {
    errors.push('At least one topping is required');
  } else {
    const invalidToppings = order.toppings.filter(t => !PIZZA_TOPPINGS.includes(t));
    if (invalidToppings.length > 0) {
      errors.push(`Invalid toppings: ${invalidToppings.join(', ')}`);
    }
  }

  return errors;
};

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
              orders: orders.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)),
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
          // Validate the order
          const validationErrors = validateOrder(newOrder);
          if (validationErrors.length > 0) {
            return {
              error: {
                status: 400,
                data: {
                  message: 'Validation failed',
                  errors: validationErrors
                }
              }
            };
          }

          // Create new order with current timestamp
          const order = {
            id: nextId++,
            customer: newOrder.fullName.trim(),
            size: newOrder.size,
            toppings: newOrder.toppings,
            timestamp: new Date().toISOString(),
            status: 'in_progress'
          };

          // Add to mock database
          orders = [order, ...orders];

          return {
            data: {
              success: true,
              message: 'Order created successfully! Your pizza is being prepared.',
              order
            }
          };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: { message: 'An unexpected error occurred while creating your order. Please try again.' }
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
