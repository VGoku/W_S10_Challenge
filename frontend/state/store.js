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

// export const store = resetStore()

import { configureStore } from '@reduxjs/toolkit';
import { pizzaApi } from './pizzaApi';
import pizzaSliceReducer from './pizzaSlice'; // Assuming pizzaSlice exports the reducer

export const store = configureStore({
  reducer: {
    // Replace 'example' with the actual name of your reducer if needed
    pizza: pizzaSliceReducer,
    [pizzaApi.reducerPath]: pizzaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pizzaApi.middleware),
});

// If you need to reset the store, you can export a function to do so
export const resetStore = () => configureStore({
  reducer: {
    pizza: pizzaSliceReducer,
    [pizzaApi.reducerPath]: pizzaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pizzaApi.middleware),
});