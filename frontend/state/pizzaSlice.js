import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  size: 'All',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.size = action.payload;
    },
  },
});

export const { setFilter } = pizzaSlice.actions;

export default pizzaSlice.reducer;
