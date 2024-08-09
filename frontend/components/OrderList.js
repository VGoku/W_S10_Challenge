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
  const orders = useGetOrdersQuery().data || [];
  const currentFilter = useSelector(st => st.pizza.size);
  const dispatch = useDispatch();

  
  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {orders &&
          orders
            .filter(
              (ord) => currentFilter === "All" || currentFilter === ord.size
            )
            .map((ord) => {
              const { id, customer, size, toppings } = ord;
              return (
                <li key={id}>
                  <div>
                    {customer} ordered a size {size} with{" "}
                    {toppings?.length || "no"} topping
                    {toppings && toppings.length === 1 ? "" : "s"}
                  </div>
                </li>
              );
            })}
      </ol>

      <div id="sizeFilters">
        Filter by size:
        {['All', 'S', 'M', 'L'].map(size => {
          const onClick = () => dispatch(setFilter(size));
          const className = `button-filter${size === "All" ? " active" : ""}`
          return  (

          
          <button
            data-testid={`filterBtn${size}`}
            className={className}
            key={size}
            onClick={onClick}
          >
            {size}
          </button>
        )
})}
      </div>
    </div>
  );
}
