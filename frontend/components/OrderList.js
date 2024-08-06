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


import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetOrdersQuery } from '../state/pizzaApi';
import { setFilter } from '../state/pizzaSlice';

export default function OrderList() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.pizza.filter);
  const { data: orders = [], error, isLoading } = useGetOrdersQuery();

  const filteredOrders = orders.filter(
    (order) => filter === 'All' || order.size === filter
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {filteredOrders.map((order) => (
          <li key={order.id}>
            <div>
              {order.fullName} ordered a size {order.size} with{' '}
              {order.toppings.length === 0 ? 'no toppings' : `${order.toppings.length} toppings`}
            </div>
          </li>
        ))}
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {['All', 'S', 'M', 'L'].map((size) => (
          <button
            data-testid={`filterBtn${size}`}
            className={`button-filter${size === filter ? ' active' : ''}`}
            key={size}
            onClick={() => dispatch(setFilter(size))}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
