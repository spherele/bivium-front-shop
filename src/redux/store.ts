import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import userSlice from './slices/userSlice';
import favoritesSlice from './slices/favoritesSlice';
import filtersSlice from './slices/filtersSlice';
import cartSlice from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    favorites: favoritesSlice.reducer,
    filters: filtersSlice.reducer,
    cart: persistReducer({ key: 'cart', storage }, cartSlice.reducer)!
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistedStore = persistStore(store);

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
