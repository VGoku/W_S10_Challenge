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

export default function OrderList() {
  const { data: orders = [] } = useGetOrdersQuery();
  const currentFilter = useSelector(state => state.pizza.size);
  const dispatch = useDispatch();

  const filteredOrders = orders.filter(
    order => currentFilter === 'All' || order.size === currentFilter
  );

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {filteredOrders.map(order => (
          <li key={order.id}>
            <div>
              <strong>{order.customer}</strong> ordered a size {order.size} with {order.toppings.length || 'no'} {order.toppings.length === 1 ? 'topping' : 'toppings'}
            </div>
          </li>
        ))}
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {['All', 'S', 'M', 'L'].map(size => (
          <button
            key={size}
            data-testid={`filterBtn${size}`}
            className={`button-filter${size === currentFilter ? ' active' : ''}`}
            onClick={() => dispatch(setFilter(size))}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
