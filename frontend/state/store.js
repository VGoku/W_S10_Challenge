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
import { setupListeners } from '@reduxjs/toolkit/query';
import { pizzaApi } from './pizzaApi';
import pizzaSliceReducer from './pizzaSlice';

export const store = configureStore({
  reducer: {
    pizza: pizzaSliceReducer,
    [pizzaApi.reducerPath]: pizzaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pizzaApi.middleware),
});

setupListeners(store.dispatch);

// Export store directly instead of using resetStore
export default store;