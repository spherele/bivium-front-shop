import { FC, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Article.module.css';

import DeliveryInformation from '@/components/ui/DeliveryInformation/DeliveryInformation';
import Breadcrumbs from '@/components/ui/Breadcrumbs/Breadcrumbs';

import { Breadcrumb } from '../ui/Breadcrumbs/models/Breadcrumb';

interface Props {
  breadсrumbs: [Breadcrumb, ...Breadcrumb[]];
  title?: string;
  content: ReactNode;
}

const Article: FC<Props> = ({ title, breadсrumbs, content }) => {
  return (
    <main className={classNames(styles.wrapper, 'container')}>
      <Breadcrumbs className={styles.breadcrumbs} breadсrumbs={breadсrumbs} withArrow />
      {title && <h1 className={styles.title}>{title}</h1>}
      <div className={styles.content}>{content}</div>
      <DeliveryInformation className={styles.deliveryInformation} />
    </main>
  );
};

export default Article;
