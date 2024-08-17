'use client';

import { FC, useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import HeaderSearch from './HeaderSearch/HeaderSearch';
import HeaderMobileSearch from './HeaderMobileSearch/HeaderMobileSearch';
import Hamburger from '@/components/popups/Hamburger/Desktop/Hamburger';

import HamburgerIcon from '@icons/hamburger.svg';
import BiviumIcon from '@icons/bivium.svg';
import HeartIcon from '@icons/heart.svg';
import BagIcon from '@icons/bag.svg';
import UserIcon from '@icons/user.svg';
import HeaderIcon from '@icons/header-logo.svg';

import { useAppSelector } from '@/redux/hooks';

import styles from './Header.module.css';

const MediaQuery = dynamic(() => import('react-responsive'), { ssr: false });

const Header: FC = () => {
  const { isAuthorized } = useAppSelector(selector => selector.user);
  const cart = useAppSelector(selector => selector.cart);
  const favorites = useAppSelector(selector => selector.favorites);

  const router = useRouter();
  const pathname = usePathname();

  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const getCategoryFromPath = (path: string): string | null => {
    if (path.startsWith('/catalog/equipment')) return 'Экипировка';
    if (path.startsWith('/catalog/clothing')) return 'Одежда';
    if (path.startsWith('/catalog/accessories')) return 'Аксессуары';
    if (path.startsWith('/catalog')) return 'Новинки';
    return null;
  };

  useEffect(() => {
    const onLoad = () => {
      document.styleSheets[0].insertRule(`
        :root {
          --header-height: ${getComputedStyle(headerRef.current!).height}
        }
      `);
    };

    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  useEffect(() => {
    setActiveCategory(getCategoryFromPath(pathname));
  }, [pathname]);

  const onSearchSubmit = (query: string) => {
    router.push(`/catalog?searchQuery=${query}`);
  };

  return (
    <>
      <header ref={headerRef} className={styles.header}>
        <div className={styles.top}>
          <button className={styles.hamburgerMenuButton} type='button' onClick={() => setIsHamburgerOpen(true)}>
            <HamburgerIcon />
          </button>
          <Link className={styles.logotype} href='/'>
            <MediaQuery minWidth={1281}>
              <HeaderIcon />
            </MediaQuery>
            <MediaQuery maxWidth={1280}>
              <BiviumIcon />
            </MediaQuery>
          </Link>
          <div className={styles.controls}>
            <MediaQuery minWidth={1281}>
              <HeaderSearch onSubmit={onSearchSubmit} />
            </MediaQuery>
            <MediaQuery maxWidth={1280}>
              <HeaderMobileSearch onSubmit={onSearchSubmit} />
            </MediaQuery>
            <Link
              className={styles.control}
              href={isAuthorized ? '/personal/favorites' : '/signin'}
              data-amount={favorites.length ? favorites.length : undefined}
            >
              <HeartIcon />
            </Link>
            <Link
              className={styles.control}
              href='/cart'
              data-amount={!!cart.products.length ? cart.products.length : undefined}
            >
              <BagIcon />
            </Link>
            <Link className={styles.control} href={isAuthorized ? '/personal' : '/signin'}>
              <UserIcon />
            </Link>
          </div>
        </div>
        <div className={styles.navigation}>
          <Link
            className={`${styles.navigationItem} ${activeCategory === 'Новинки' ? styles.active : ''}`}
            href='/catalog'
            onClick={() => setActiveCategory('Новинки')}
          >
            Новинки
          </Link>
          <Link
            className={`${styles.navigationItem} ${activeCategory === 'Экипировка' ? styles.active : ''}`}
            href='/catalog/equipment'
            onClick={() => setActiveCategory('Экипировка')}
          >
            Экипировка
          </Link>
          <Link
            className={`${styles.navigationItem} ${activeCategory === 'Одежда' ? styles.active : ''}`}
            href='/catalog/clothing'
            onClick={() => setActiveCategory('Одежда')}
          >
            Одежда
          </Link>
          <Link
            className={`${styles.navigationItem} ${activeCategory === 'Аксессуары' ? styles.active : ''}`}
            href='/catalog/accessories'
            onClick={() => setActiveCategory('Аксессуары')}
          >
            Аксессуары
          </Link>
        </div>
      </header>
      <Hamburger isOpened={isHamburgerOpen} onClose={() => setIsHamburgerOpen(false)} />
    </>
  );
};

export default Header;
