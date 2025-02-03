// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useGetOrdersQuery } from '../state/pizzaApi';
// import { setFilter } from '../state/pizzaSlice';


// export default function OrderList() {
//   const orders = []
//   return (
//     <div id="orderList">
//       <h2>Pizza Orders</h2>
//       <ol>
//         {
//           orders.map(() => {
//             return (
//               <li key={1}>
//                 <div>
//                   order details here
//                 </div>
//               </li>
//             )
//           })
//         }
//       </ol>
//       <div id="sizeFilters">
//         Filter by size:
//         {
//           ['All', 'S', 'M', 'L'].map(size => {
//             const className = `button-filter${size === 'All' ? ' active' : ''}`
//             return <button
//               data-testid={`filterBtn${size}`}
//               className={className}
//               key={size}>{size}</button>
//           })
//         }
//       </div>
//     </div>
//   )
// }




import React from 'react';
import { useGetOrdersQuery } from '../state/pizzaApi';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../state/pizzaSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPizzaSlice,
  faFilter,
  faUser,
  faRuler
} from '@fortawesome/free-solid-svg-icons';

const getSizeIcon = (size) => {
  switch (size) {
    case 'S':
      return '🍕';
    case 'M':
      return '🍕🍕';
    case 'L':
      return '🍕🍕🍕';
    default:
      return '🍕';
  }
};

export default function OrderList() {
  const { data, isLoading, error } = useGetOrdersQuery(undefined, {
    refetchOnMountOrArgChange: true
  });
  const currentFilter = useSelector(st => st.pizza.size);
  const dispatch = useDispatch();

  if (isLoading) {
    return (
      <div id="orderList">
        <h2>
          <FontAwesomeIcon icon={faPizzaSlice} className="pizza-icon" />
          Loading Orders...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div id="orderList">
        <h2>
          <FontAwesomeIcon icon={faPizzaSlice} className="pizza-icon" />
          Error Loading Orders
        </h2>
        <div>{error.toString()}</div>
      </div>
    );
  }

  const orders = data || [];
  const filteredOrders = orders.filter(
    order => currentFilter === "All" || order.size === currentFilter
  );

  return (
    <div id="orderList">
      <h2>
        <FontAwesomeIcon icon={faPizzaSlice} className="pizza-icon" />
        Pizza Orders
      </h2>
      <ol>
        {filteredOrders.map(order => (
          <li key={order.id}>
            <div className="order-details">
              <div>
                <FontAwesomeIcon icon={faUser} className="pizza-icon" />
                <strong>{order.customer}</strong>
              </div>
              <div>
                <FontAwesomeIcon icon={faRuler} className="pizza-icon" />
                Size: {order.size} {getSizeIcon(order.size)}
              </div>
              <div>
                <FontAwesomeIcon icon={faPizzaSlice} className="pizza-icon" />
                Toppings: {order.toppings?.length || "no"} {order.toppings?.length === 1 ? "topping" : "toppings"}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div id="sizeFilters">
        <FontAwesomeIcon icon={faFilter} className="pizza-icon" />
        Filter by size:
        {['All', 'S', 'M', 'L'].map(size => (
          <button
            key={size}
            data-testid={`filterBtn${size}`}
            className={`button-filter${size === currentFilter ? " active" : ""}`}
            onClick={() => dispatch(setFilter(size))}
          >
            {size === 'All' ? size : getSizeIcon(size)}
          </button>
        ))}
      </div>
    </div>
  );
}
