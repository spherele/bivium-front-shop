'use client';

import { FC, useRef, ReactNode, useLayoutEffect } from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistedStore, AppStore } from '@/redux/store';
import { setUser } from './slices/userSlice';
import { cartFetch } from './slices/cartSlice';
import { fetchFavorites } from './slices/favoritesSlice';

import { IUser } from '@/models';

interface Props {
  children: ReactNode;
  user: IUser | null;
}

const StoreProvider: FC<Props> = ({ children, user }) => {
  const storeRef = useRef<AppStore>(store);
  const once = useRef(false);

  useLayoutEffect(() => {
    if (once.current) {
      return;
    }

    user && storeRef.current.dispatch(setUser(user));
    storeRef.current.dispatch(cartFetch());
    storeRef.current.dispatch(fetchFavorites());

    once.current = true;
  }, [user]);

  return (
    <Provider store={storeRef.current}>
      <PersistGate persistor={persistedStore}>{children}</PersistGate>
    </Provider>
  );
};

export default StoreProvider;
