'use client';

import { FC, useState } from 'react';
import classNames from 'classnames';
import ky from 'ky';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { logoutUser } from '@/redux/slices/userSlice';

import OverlayingPopup from '@/components/popups/OverlayingPopup/OverlayingPopup';
import ConfirmDialogPopup from '@/components/popups/ConfirmDialogPopup/ConfirmDialogPopup';

import styles from './Navigation.module.css';

const Navigation: FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selector => selector.favorites);

  const [isSignoutPopupOpen, setIsSignoutPopupOpen] = useState(false);

  const signout = () => {
    ky.post('/next-api/auth/signout');
    router.push('/');
    dispatch(logoutUser());
  };

  return (
    <>
      <div className={styles.navigation}>
        <Link
          className={classNames(styles.navigationItem, pathname.endsWith('/favorites') && styles.navigationItem_active)}
          href='/personal/favorites'
        >
          Избранное ({favorites.length})
        </Link>
        <Link
          className={classNames(styles.navigationItem, pathname.endsWith('/orders') && styles.navigationItem_active)}
          href='/personal/orders'
        >
          Заказы
        </Link>
        <Link
          className={classNames(styles.navigationItem, pathname.endsWith('/personal') && styles.navigationItem_active)}
          href='/personal'
        >
          Данные
        </Link>
        <Link
          className={classNames(
            styles.navigationItem,
            pathname.endsWith('/subscriptions') && styles.navigationItem_active
          )}
          href='/personal/subscriptions'
        >
          Подписки
        </Link>
        <div className={styles.navigationSeparator}></div>
        <button className={styles.navigationItem} type='button' onClick={() => setIsSignoutPopupOpen(true)}>
          Выйти
        </button>
      </div>
      <OverlayingPopup isOpen={isSignoutPopupOpen}>
        <ConfirmDialogPopup
          title='Вы уверены, что хотите выйти из профиля?'
          submitButtonText='Подтвердить'
          submitButtonHandler={signout}
          cancelButtonText='Отмена'
          cancelButtonHandler={() => setIsSignoutPopupOpen(false)}
        ></ConfirmDialogPopup>
      </OverlayingPopup>
    </>
  );
};

export default Navigation;
