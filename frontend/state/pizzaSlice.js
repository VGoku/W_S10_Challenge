import { createSlice } from '@reduxjs/toolkit';
import { pizzaApi } from './pizzaApi';

const initialState = {
  filter: 'All',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setFilter } = pizzaSlice.actions;

export default pizzaSlice.reducer;
