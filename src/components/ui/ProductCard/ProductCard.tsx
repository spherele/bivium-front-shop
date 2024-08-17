'use client';

import { FC, MouseEvent } from 'react';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

import classNames from 'classnames';

import HeartIcon from '@icons/heart.svg';

import styles from './ProductCard.module.css';

import { IProductCard } from '@/models';
import { formatPrice } from '@/utils/formatPrice';

import { useAppSelector } from '@/redux/hooks';
import { useAppDispatch } from '@/redux/hooks';
import { putFavorites, removeFavorites } from '@/redux/slices/favoritesSlice';

interface Props extends IProductCard {
  small?: boolean;
  className?: string;
}

const ProductCard: FC<Props> = ({ id, image, name, price, inStock, small, className }) => {
  const router = useRouter();

  const { isAuthorized } = useAppSelector(selector => selector.user);
  const favorites = useAppSelector(selector => selector.favorites);
  const dispatch = useAppDispatch();

  const favoriteButtonCallback = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!isAuthorized) {
      router.push('/signin');
      return;
    }

    dispatch(
      favorites.findIndex(item => item.id === id) === -1
        ? putFavorites({ id, image, name, price, inStock })
        : removeFavorites({ id, image, name, price, inStock })
    );
  };

  return (
    <Link className={classNames(styles.wrapper, small && styles.small, className)} href={`/products/${id}`}>
      {!inStock && <div className={styles.badge}>нет в наличии</div>}
      <button
        className={classNames(
          styles.favoriteButton,
          favorites.findIndex(item => item.id === id) !== -1 && styles.favoriteButton_active
        )}
        type='button'
        onClick={favoriteButtonCallback}
      >
        <HeartIcon />
      </button>
      <img className={styles.image} src={image} alt='' />
      <div className={styles.name}>{name}</div>
      <div className={styles.price}>{inStock ? formatPrice(price) : 'нет в наличии'}</div>
    </Link>
  );
};

export default ProductCard;
