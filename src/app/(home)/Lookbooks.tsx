import { FC } from 'react';
import classNames from 'classnames';
import { formatUrl } from '@/utils/formatUrl';
import styles from './Lookbooks.module.css';

interface ILookbook {
  picture: string;
  mobilePicture: string | null;
  topText: string;
  bottomText: string;
}

interface Props {
  items: ILookbook[];
}

const Lookbooks: FC<Props> = ({ items }) => {
  return (
    <section className={classNames(styles.wrapper, 'container')}>
      <h2 className={styles.title}>Лукбуки BIVIUM</h2>
      <div className={styles.items}>
        {items.map((item, itemIndex) => (
          <div
            key={itemIndex}
            className={styles.item}
            style={{
              '--picture': `url(${formatUrl(item.picture)})`,
              '--mobile-picture': `url(${formatUrl(item.mobilePicture ?? item.picture)})`
            }}
          >
            <div className={styles.itemTopText}>{item.topText}</div>
            <div className={styles.itemBottomText}>{item.bottomText}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Lookbooks;
