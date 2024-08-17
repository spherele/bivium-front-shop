'use client';

import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import classNames from 'classnames';
import Link from 'next/link';

import Portal from '@/components/Portal';

import LogotypeIcon from '@icons/logotype.svg';
import ArrowLeftIcon from '@icons/arrow-left.svg';
import CrossIcon from '@icons/cross.svg';
import ChevronRight from '@icons/chevron-right.svg';

import ky from 'ky';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { logoutUser } from '@/redux/slices/userSlice';

import styles from './Hamburger.module.css';

type Menu = 'equipment' | 'mens-equipment' | 'womens-equipment' | 'help' | 'about-company' | 'cooperation';

interface Props {
  isOpened: boolean;
  onClose: () => void;
}

const Hamburger: FC<Props> = ({ isOpened, onClose }) => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { isAuthorized } = useAppSelector(selector => selector.user);
  const favorites = useAppSelector(selector => selector.favorites);

  const [previousMenus, setPreviousMenus] = useState<Menu[]>([]);
  const [menu, setMenu] = useState<Menu | null>(null);

  const onCloseHandler = () => {
    setPreviousMenus([]);
    setMenu(null);
    onClose();
  };

  const signout = () => {
    ky.post('/next-api/auth/signout');
    router.push('/');
    dispatch(logoutUser());
  };

  useEffect(() => {
    setPreviousMenus(menus => {
      if (menu === null) {
        return [];
      }

      if (menus.includes(menu)) {
        return menus.slice(0, -1);
      }

      return menus.concat([menu]);
    });
  }, [menu]);

  useEffect(() => {
    document.body.style.overflow = isOpened ? 'hidden' : '';
  }, [isOpened]);

  if (!isOpened) {
    return null;
  }

  return (
    <Portal>
      <div className={styles.wrapper} onClick={onCloseHandler}>
        <div className={classNames(styles.menu, styles.menu_submenu)} onClick={event => event.stopPropagation()}>
          <div className={styles.menuHeader}>
            {previousMenus[previousMenus.length - 1] === undefined ? (
              <Link className={styles.menuHeaderLogotype} href='/' onClick={onCloseHandler}>
                <LogotypeIcon />
              </Link>
            ) : (
              <button
                className={styles.menuHeaderBack}
                type='button'
                onClick={() => setMenu(previousMenus[previousMenus.length - 2] ?? null)}
              >
                <ArrowLeftIcon />
              </button>
            )}
            <button className={styles.menuHeaderCloseButton} type='button' onClick={onCloseHandler}>
              <CrossIcon />
            </button>
          </div>
          <div className={styles.menuItems}>
            {menu === null && (
              <>
                <Link className={styles.menuItem} href='' onClick={onCloseHandler}>
                  Новинки
                </Link>
                <button
                  className={classNames(styles.menuItem, styles.menuItem_menu)}
                  type='button'
                  onClick={() => setMenu('equipment')}
                >
                  Экипировка
                  <ChevronRight />
                </button>
                <button className={classNames(styles.menuItem, styles.menuItem_menu)} type='button'>
                  Одежда
                  <ChevronRight />
                </button>
                <Link className={styles.menuItem} href='/catalog/accessories' onClick={onCloseHandler}>
                  Акссесуары
                </Link>
                <div className={styles.menuItemsSeparator}></div>
                <button
                  className={classNames(styles.menuItem, styles.menuItem_menu)}
                  type='button'
                  onClick={() => setMenu('help')}
                >
                  Помощь
                  <ChevronRight />
                </button>
                <button
                  className={classNames(styles.menuItem, styles.menuItem_menu)}
                  type='button'
                  onClick={() => setMenu('about-company')}
                >
                  О компании
                  <ChevronRight />
                </button>
                <button
                  className={classNames(styles.menuItem, styles.menuItem_menu)}
                  type='button'
                  onClick={() => setMenu('cooperation')}
                >
                  Сотрудничество
                  <ChevronRight />
                </button>
                <div className={styles.menuItemsSeparator}></div>
                <Link className={styles.menuItem} href='/personal/favorites' onClick={onCloseHandler}>
                  Избранное ({favorites.length})
                </Link>
                <Link className={styles.menuItem} href='/personal/orders' onClick={onCloseHandler}>
                  Заказы
                </Link>
                <Link className={styles.menuItem} href='/personal' onClick={onCloseHandler}>
                  Данные
                </Link>
                <Link className={styles.menuItem} href='/personal/subscriptions' onClick={onCloseHandler}>
                  Подписки
                </Link>
                {isAuthorized && (
                  <>
                    <div className={styles.menuItemsSeparator}></div>
                    <button className={styles.menuItem} type='button' onClick={signout}>
                      Выйти
                    </button>
                  </>
                )}
              </>
            )}
            {menu === 'equipment' && (
              <>
                <button
                  className={classNames(styles.menuItem, styles.menuItem_menu)}
                  type='button'
                  onClick={() => setMenu('mens-equipment')}
                >
                  Мужская экипировка
                  <ChevronRight />
                </button>
                <button
                  className={classNames(styles.menuItem, styles.menuItem_menu)}
                  type='button'
                  onClick={() => setMenu('womens-equipment')}
                >
                  Женская экипировка
                  <ChevronRight />
                </button>
              </>
            )}
            {menu === 'mens-equipment' && (
              <>
                <Link className={styles.menuItem} href='' onClick={onCloseHandler}>
                  Куртки
                </Link>
                <Link className={styles.menuItem} href='' onClick={onCloseHandler}>
                  Костюмы
                </Link>
                <Link className={styles.menuItem} href='' onClick={onCloseHandler}>
                  Жилеты
                </Link>
                <Link className={styles.menuItem} href='' onClick={onCloseHandler}>
                  Брюки
                </Link>
                <Link className={styles.menuItem} href='' onClick={onCloseHandler}>
                  Шорты
                </Link>
              </>
            )}
            {menu === 'help' && (
              <>
                <Link className={styles.menuItem} href='/contacts' onClick={onCloseHandler}>
                  Контакты
                </Link>
                <Link className={styles.menuItem} href='/sizes' onClick={onCloseHandler}>
                  Размерная таблица
                </Link>
                <Link className={styles.menuItem} href='/payment' onClick={onCloseHandler}>
                  Оплата товара
                </Link>
                <Link className={styles.menuItem} href='/delivery' onClick={onCloseHandler}>
                  Условия доставки
                </Link>
                <Link className={styles.menuItem} href='/return' onClick={onCloseHandler}>
                  Возврат товара
                </Link>
                <Link className={styles.menuItem} href='/care' onClick={onCloseHandler}>
                  Знаки и уход за товарами
                </Link>
                <Link className={styles.menuItem} href='' onClick={onCloseHandler}>
                  Акции
                </Link>
              </>
            )}
            {menu === 'about-company' && (
              <>
                <Link className={styles.menuItem} href='/news' onClick={onCloseHandler}>
                  Новости
                </Link>
                <Link className={styles.menuItem} href='' onClick={onCloseHandler}>
                  Команда
                </Link>
                <Link className={styles.menuItem} href='/manufacturing' onClick={onCloseHandler}>
                  О производстве
                </Link>
                <Link className={styles.menuItem} href='/certificates' onClick={onCloseHandler}>
                  Сертификаты
                </Link>
                <Link className={styles.menuItem} href='/vacancies' onClick={onCloseHandler}>
                  Вакансии
                </Link>
                <Link className={styles.menuItem} href='/contacts' onClick={onCloseHandler}>
                  Магазины
                </Link>
                <Link className={styles.menuItem} href='/public-offer' onClick={onCloseHandler}>
                  Публичная оферта
                </Link>
                <Link className={styles.menuItem} href='/privacy-policy' onClick={onCloseHandler}>
                  Политика конфиденциальности
                </Link>
              </>
            )}
            {menu === 'cooperation' && (
              <>
                <Link className={styles.menuItem} href='/conditions' onClick={onCloseHandler}>
                  Условия сотрудничества для оптовых покупателей
                </Link>
                <Link className={styles.menuItem} href='/ambassadors' onClick={onCloseHandler}>
                  Стать амбасадором или представителем бренда
                </Link>
                <Link className={styles.menuItem} href='/testers' onClick={onCloseHandler}>
                  Стать тестировщиком
                </Link>
                <Link className={styles.menuItem} href='' onClick={onCloseHandler}>
                  Команда бренда
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Hamburger;
