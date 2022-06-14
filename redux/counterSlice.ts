import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchCount} from '../utils';
import {AppThunk} from './store';

export interface CounterState {
  value: number;
  loading: boolean;
  error: boolean;
}

const initialState: CounterState = {
  value: 0,
  loading: false,
  error: false,
};

export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount: number) => {
    const response = await fetchCount(amount);
    return response;
  },
);

export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = getState().counter.value;
    const {incrementByAmount} = counterSlice.actions;
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount));
    }
  };

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.loading = false;
      state.error = false;
      state.value += 1;
    },
    decrement: state => {
      state.loading = false;
      state.error = false;
      if (state.value > 0) {
        state.value -= 1;
      }
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.loading = false;
      state.error = false;
      state.value += action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(incrementAsync.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.value += action.payload;
      })
      .addCase(incrementAsync.rejected, state => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default counterSlice;
