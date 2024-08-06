import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { pizzaApi } from './pizzaApi';

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk(
  'pizza/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await pizzaApi.get('/history');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export default pizzaSlice.reducer;
