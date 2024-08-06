// import React from 'react';
// import pizzaSlice from '../state/pizzaSlice';
// import { store } from '../state/store';
// import { pizzaApi } from '../state/pizzaApi';

// const initialFormState = { // suggested
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

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCreateOrderMutation } from '../state/pizzaApi';

const initialFormState = {
  fullName: '',
  size: '',
  toppings: [], // Use an array to manage toppings
};

export default function PizzaForm() {
  const [formState, setFormState] = useState(initialFormState);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: name === 'toppings' ? (checked ? [...prevState.toppings, value] : prevState.toppings.filter((t) => t !== value)) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formState.fullName && formState.size) {
      createOrder({
        fullName: formState.fullName,
        size: formState.size,
        toppings: formState.toppings.map((t) => parseInt(t)), // Convert toppings to integers
      }).unwrap()
        .then(() => {
          // Reset form state on success
          setFormState(initialFormState);
        })
        .catch((err) => {
          // Handle error from server
          console.error('Order submission failed:', err);
        });
    } else {
      // Handle form validation errors
      console.error('Form is invalid');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {isLoading && <div className='pending'>Order in progress...</div>}
      {error && <div className='failure'>Order failed: {error.data.message}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={formState.fullName}
            onChange={handleInputChange}
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
            value={formState.size}
            onChange={handleInputChange}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input
            data-testid="checkPepperoni"
            name="toppings"
            type="checkbox"
            value="1"
            checked={formState.toppings.includes('1')}
            onChange={handleInputChange}
          />
          Pepperoni<br />
        </label>
        {/* Repeat for other toppings with appropriate values (2, 3, 4, 5) */}
      </div>
      <input
        data-testid="submit"
        type="submit"
        value="Submit Order"
      />
    </form>
  );
}