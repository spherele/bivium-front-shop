'use client';

import { FC, useState, useMemo } from 'react';
import classNames from 'classnames';

import Card from '../Card/Card';
import PromocodeInput from '@/components/PromocodeInput/PromocodeInput';

import { formatUrl } from '@/utils/formatUrl';
import { formatPrice } from '@/utils/formatPrice';

import styles from './ShipmentContent.module.css';

interface IProduct {
  image: string;
  name: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
}

interface Props {
  products: IProduct[];
  deliveryPrice?: number;
  withPromocode?: { orderId?: number; discount?: number };
  className?: string;
}

const ShipmentContent: FC<Props> = ({ products, deliveryPrice = 0, withPromocode, className }) => {
  const [discount, setDiscount] = useState<number | null>(withPromocode?.discount || null);

  const productsPrice = useMemo(
    () =>
      products
        .map(product => product.price * product.quantity)
        .reduce((previousValue, currentValue) => previousValue + currentValue),
    [products]
  );

  const resultPrice = useMemo(
    () => productsPrice + deliveryPrice - ((productsPrice + deliveryPrice) / 100) * (discount ?? 0),
    [deliveryPrice, discount, productsPrice]
  );

  return (
    <Card className={classNames(styles.wrapper, className)} title='Содержимое отправления'>
      <div className={styles.products}>
        {products.map((product, productIndex) => (
          <div key={productIndex} className={styles.product}>
            <img className={styles.productImage} src={formatUrl(product.image)} alt='' />
            <div className={styles.productBody}>
              <div className={styles.productTitle}>{product.name}</div>
              <div className={styles.productProperties}>
                <div className={styles.productPropertiesItem}>
                  <div className={styles.productPropertiesItemName}>Цвет:</div>
                  <div className={styles.productPropertiesItemValue}>{product.color}</div>
                </div>
                <div className={styles.productPropertiesItem}>
                  <div className={styles.productPropertiesItemName}>Размер:</div>
                  <div className={styles.productPropertiesItemValue}>{product.size}</div>
                </div>
                <div className={styles.productPropertiesItem}>
                  <div className={styles.productPropertiesItemName}>Количество:</div>
                  <div className={styles.productPropertiesItemValue}>{product.quantity}</div>
                </div>
              </div>
              <div className={styles.productPrice}>{formatPrice(product.price * product.quantity)}</div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <div className={styles.summaryText}>{products.length} товара</div>
          <div className={styles.summaryPrice}>{formatPrice(productsPrice)}</div>
        </div>
        {!!deliveryPrice && (
          <div className={styles.summaryRow}>
            <div className={styles.summaryText}>Доставка</div>
            <div className={styles.summaryPrice}>{formatPrice(deliveryPrice)}</div>
          </div>
        )}
        {discount !== null && (
          <div className={styles.summaryRow}>
            <div className={styles.summaryText}>
              Скидка -{Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 }).format(discount).replace(',', '.')}%
            </div>
            <div className={styles.summaryPrice}>-{formatPrice((productsPrice / 100) * discount)}</div>
          </div>
        )}
      </div>
      <div className={styles.result}>
        <div className={styles.resultText}>Итог:</div>
        <div className={styles.resultPrice}>{formatPrice(resultPrice)}</div>
      </div>
      {withPromocode?.orderId && (
        <PromocodeInput orderId={withPromocode?.orderId} className={styles.promocodeInput} onApplied={setDiscount} />
      )}
    </Card>
  );
};

export default ShipmentContent;
