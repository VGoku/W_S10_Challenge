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

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetOrdersQuery } from '../state/pizzaApi';
import { setFilter } from '../state/pizzaSlice';

export default function OrderList() {
  // Use the RTK Query hook to fetch the orders
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  // Use Redux to manage the filter state
  const filter = useSelector((state) => state.pizza.filter);
  const dispatch = useDispatch();

  // State to hold the filtered orders
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    // Update the filtered orders when the filter or orders change
    setFilteredOrders(
      orders?.filter((order) => filter === 'All' || order.size === filter)
    );
  }, [orders, filter]);

  // Handle filter button clicks
  const handleFilterClick = (size) => {
    dispatch(setFilter(size));
  };

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error fetching orders: {error.message}</p>}
      <ol>
        {filteredOrders.map((order) => (
          <li key={order.id}>
            <div>
              {/* Render order details here */}
              {order.fullName} ordered a size {order.size} pizza{' '}
              {order.toppings?.length ? `with ${order.toppings.length} toppings` : 'with no toppings'}
            </div>
          </li>
        ))}
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {['All', 'S', 'M', 'L'].map((size) => (
          <button
            data-testid={`filterBtn${size}`}
            className={`button-filter ${size === filter ? 'active' : ''}`}
            key={size}
            onClick={() => handleFilterClick(size)}>
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}