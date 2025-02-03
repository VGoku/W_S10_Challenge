// import React from 'react';
// import pizzaSlice from '../state/pizzaSlice';
// import { store } from '../state/store';
// import { pizzaApi } from '../state/pizzaApi';

// const initialform = { // suggested
//   fullName: '',
//   size: '',
//   '1': false,
//   '2': false,
//   '3': false,
//   '4': false,
//   '5': false,
// }

// export default function PizzaForm() {
//   return (
//     <form>
//       <h2>Pizza Form</h2>
//       {true && <div className='pending'>Order in progress...</div>}
//       {true && <div className='failure'>Order failed: fullName is required</div>}

//       <div className="input-group">
//         <div>
//           <label htmlFor="fullName">Full Name</label><br />
//           <input
//             data-testid="fullNameInput"
//             id="fullName"
//             name="fullName"
//             placeholder="Type full name"
//             type="text"
//           />
//         </div>
//       </div>

//       <div className="input-group">
//         <div>
//           <label htmlFor="size">Size</label><br />
//           <select data-testid="sizeSelect" id="size" name="size">
//             <option value="">----Choose size----</option>
//             <option value="S">Small</option>
//             <option value="M">Medium</option>
//             <option value="L">Large</option>
//           </select>
//         </div>
//       </div>

//       <div className="input-group">
//         <label>
//           <input data-testid="checkPepperoni" name="1" type="checkbox" />
//           Pepperoni<br /></label>
//         <label>
//           <input data-testid="checkGreenpeppers" name="2" type="checkbox" />
//           Green Peppers<br /></label>
//         <label>
//           <input data-testid="checkPineapple" name="3" type="checkbox" />
//           Pineapple<br /></label>
//         <label>
//           <input data-testid="checkMushrooms" name="4" type="checkbox" />
//           Mushrooms<br /></label>
//         <label>
//           <input data-testid="checkHam" name="5" type="checkbox" />
//           Ham<br /></label>
//       </div>
//       <input data-testid="submit" type="submit" />
//     </form>
//   )
// }


import React, { useReducer } from 'react';
import { useCreateOrderMutation } from '../state/pizzaApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPizzaSlice,
  faPepperHot,
  faSeedling,
  faLeaf,
  faCircle,
  faBacon,
  faSpinner,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';

const initialFormState = {
  fullName: '',
  size: '',
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT": {
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    }
    case "RESET_FORM":
      return initialFormState;
    default:
      return state;
  }
};

const TOPPINGS = [
  { id: '1', name: 'Pepperoni', icon: faPepperHot },
  { id: '2', name: 'Green Peppers', icon: faSeedling },
  { id: '3', name: 'Pineapple', icon: faLeaf },
  { id: '4', name: 'Mushrooms', icon: faCircle },
  { id: '5', name: 'Ham', icon: faBacon },
];

export default function PizzaForm() {
  const [form, dispatch] = useReducer(reducer, initialFormState);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const onChange = (evt) => {
    let { name, value, type, checked } = evt.target;
    let valueToUse = type === "checkbox" ? checked : value;
    dispatch({ type: "CHANGE_INPUT", payload: { name, value: valueToUse } });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    let { fullName, size, ...toppingsSelection } = form;
    let toppings = [];
    for (let key in toppingsSelection) {
      if (toppingsSelection[key]) toppings.push(key);
    }
    let requestBody = { fullName, size, toppings };
    createOrder(requestBody)
      .unwrap()
      .then(() => {
        dispatch({ type: "RESET_FORM" });
      })
      .catch(() => { });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2><FontAwesomeIcon icon={faPizzaSlice} className="pizza-icon" />Pizza Form</h2>
      {isLoading && (
        <div className='pending'>
          <FontAwesomeIcon icon={faSpinner} spin />
          Order in progress...
        </div>
      )}
      {error && (
        <div className='failure'>
          <FontAwesomeIcon icon={faExclamationCircle} />
          Order failed: {error.data.message}
        </div>
      )}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={form.fullName}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select
            data-testid="sizeSelect"
            id="size"
            name="size"
            value={form.size}
            onChange={onChange}
          >
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        {TOPPINGS.map(topping => (
          <label key={topping.id} className="topping-label">
            <input
              data-testid={`check${topping.name.replace(/\s+/g, '')}`}
              name={topping.id}
              type="checkbox"
              checked={form[topping.id]}
              onChange={onChange}
            />
            <FontAwesomeIcon icon={topping.icon} className="pizza-icon" />
            {topping.name}
          </label>
        ))}
      </div>
      <input data-testid="submit" type="submit" value="Place Order" />
    </form>
  );
}
