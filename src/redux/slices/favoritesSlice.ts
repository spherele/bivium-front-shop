import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { IProductCard } from '@/models';
import api from '@/api';

const fetch = createAsyncThunk('favorites/fetch', async () => {
  return await api.get('favorites/').json<IProductCard[]>();
});

const put = createAsyncThunk('favorites/put', async (item: IProductCard) => {
  await api.put(`favorites/${item.id}/`);
  return item;
});

const remove = createAsyncThunk('favorites/remove', async (item: IProductCard) => {
  await api.delete(`favorites/${item.id}/`);
  return item;
});

const initialState: IProductCard[] = [];

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetch.fulfilled, (state, action) => {
      return action.payload;
    });

    builder.addCase(put.pending, (state, action) => {
      if (state.findIndex(item => item.id === action.meta.arg.id) === -1) {
        state.push(action.meta.arg);
      }

      return state;
    });

    builder.addCase(put.rejected, (state, action) => {
      return state.filter(item => item.id !== action.meta.arg.id);
    });

    builder.addCase(remove.pending, (state, action) => {
      return state.filter(item => item.id !== action.meta.arg.id);
    });

    builder.addCase(remove.rejected, (state, action) => {
      state.push(action.meta.arg);
      return state;
    });
  }
});

export { fetch as fetchFavorites, put as putFavorites, remove as removeFavorites };
export default favoritesSlice;
