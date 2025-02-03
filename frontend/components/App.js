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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons';

export default function App() {
  return (
    <Provider store={store}>
      <div>
        <header>
          <h1>
            <FontAwesomeIcon
              icon={faPizzaSlice}
              className="pizza-icon"
              style={{ marginRight: '1rem' }}
            />
            VGoku Pizzeria
          </h1>
          <p className="subtitle">Legendary Pizza, Delivered to Your Door! 🌟</p>
        </header>

        <div id="app">
          <PizzaForm />
          <OrderList />
        </div>

        <footer>
          <p>© {new Date().getFullYear()} VGoku Pizzeria. All rights reserved. 🍕</p>
        </footer>
      </div>
    </Provider>
  );
}