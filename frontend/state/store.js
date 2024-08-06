// import { configureStore } from '@reduxjs/toolkit';
// import { pizzaApi } from './pizzaApi';
// import pizzaSlice from './pizzaSlice';

// const exampleReducer = (state = { count: 0 }) => {
//   return state
// }

// export const resetStore = () => configureStore({
//   reducer: {
//     example: exampleReducer,
//     // add your reducer(s) here
//     [pizzaApi.reducerPath]: pizzaApi.reducer
//   },
//   middleware: getDefault => getDefault().concat(
//     // if using RTK Query for your networking: add your middleware here
//     // if using Redux Thunk for your networking: you can ignore this
//     pizzaApi.middleware
//   ),
// })


import { configureStore } from '@reduxjs/toolkit';
import { pizzaApi } from './pizzaApi';
import pizzaSliceReducer from './pizzaSlice'; // Assuming pizzaSlice exports the reducer

export const store = configureStore({
  reducer: {
    pizza: pizzaSliceReducer, // Slice reducer
    [pizzaApi.reducerPath]: pizzaApi.reducer, // RTK Query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pizzaApi.middleware),
});

// Function to reset the store, useful for tests
export const resetStore = () => configureStore({
  reducer: {
    pizza: pizzaSliceReducer, // Slice reducer
    [pizzaApi.reducerPath]: pizzaApi.reducer, // RTK Query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pizzaApi.middleware),
});
