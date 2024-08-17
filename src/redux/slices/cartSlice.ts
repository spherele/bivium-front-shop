import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import api from '@/api';
import { ICartResponse } from '@/api/models';

interface ICartProduct {
  id: number;
  name: string;
  color: string;
  size: string;
  price: number;
  image: string;
  amount: number;
}

interface Cart {
  products: ICartProduct[];
}

const fetch = createAsyncThunk('cart/fetch', async () => {
  const response = await api.get('cart/').json<ICartResponse>();
  return response.items ?? [];
});

const put = createAsyncThunk('cart/put', async (item: ICartProduct) => {
  const response = await api.put(`cart/${item.id}/`).json<{ amountLeft: number }>();
  return response;
});

const remove = createAsyncThunk('cart/remove', async ({ id, all }: { id: number; all?: boolean }) => {
  const response = await api
    .delete(`cart/${id}/`, {
      searchParams: {
        ...(all && { all: '' })
      }
    })
    .json<{ amountLeft: number }>();

  return response;
});

const initialState: Cart = {
  products: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartClear: () => initialState
  },
  extraReducers: builder => {
    builder.addCase(fetch.fulfilled, (state, action) => {
      state.products = action.payload;
    });

    builder.addCase(put.pending, (state, action) => {
      const productIndex = state.products.findIndex(item => item.id === action.meta.arg.id);
      productIndex === -1 ? state.products.push(action.meta.arg) : state.products[productIndex].amount++;
    });

    builder.addCase(put.fulfilled, (state, action) => {
      const productIndex = state.products.findIndex(item => item.id === action.meta.arg.id);

      productIndex === -1
        ? state.products.push(action.meta.arg)
        : (state.products[productIndex].amount = action.payload.amountLeft);
    });

    builder.addCase(remove.pending, (state, action) => {
      const productIndex = state.products.findIndex(item => item.id === action.meta.arg.id);

      if (productIndex === -1) {
        return;
      }

      if (action.meta.arg.all) {
        state.products = state.products.filter(item => item.id !== action.meta.arg.id);
      } else {
        state.products[productIndex].amount--;
      }
    });
  }
});

export { fetch as cartFetch, put as cartPut, remove as cartRemove };
export const { cartClear } = cartSlice.actions;
export default cartSlice;
