// import React from 'react'
// import PizzaForm from './PizzaForm'
// import OrderList from './OrderList'
// import pizzaSlice from '../state/pizzaSlice';
// import { store } from '../state/store';
// import { pizzaApi } from '../state/pizzaApi';

// export default function App() {
//   return (
//     <div id="app">
//       <PizzaForm />
//       <OrderList />
//     </div>
//   )
// }

import React from 'react';
import { Provider } from 'react-redux';
import PizzaForm from './PizzaForm';
import OrderList from './OrderList';
import { store } from '../state/store';

export default function App() {
  return (
    <Provider store={store}>
      <div id="app">
        <h1>Pizza Order App</h1>
        <PizzaForm />
        <OrderList />
      </div>
    </Provider>
  );
}