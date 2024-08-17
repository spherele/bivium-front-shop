import { FC, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './NewsItem.module.css';

interface NewsItemProps {
  id: number;
  image: string;
  name: string;
  date: string;
  description: string;
}

const NewsItem: FC<NewsItemProps> = ({ id, image, name, date, description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [lineClamp, setLineClamp] = useState<number | undefined>(undefined);
  const dateRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const lineHeight = 1.2 * 24;

  useEffect(() => {
    if (dateRef.current && titleRef.current && descriptionRef.current) {
      const dateHeight = dateRef.current.offsetHeight;
      const titleHeight = titleRef.current.offsetHeight;
      const remainingHeight = 460 - dateHeight - titleHeight - 65;
      const clampValue = Math.floor(remainingHeight / lineHeight);
      setLineClamp(clampValue);

      const descriptionHeight = descriptionRef.current.scrollHeight;
      if (descriptionHeight > remainingHeight) {
        setShowButton(true);
      }
    }
  }, [lineHeight]);

  return (
    <div className={styles.newsItem}>
      <Link href={`/news/${id}`}>
        <div className={styles.wrapper}>
          <img src={image} alt={name} />
          <div className={styles.textContainer}>
            <p className={styles.newsItemDate} ref={dateRef}>
              {date}
            </p>
            <h2 className={styles.newsItemTitle} ref={titleRef}>
              {name}
            </h2>
            <div
              className={`${styles.newsItemDescription} ${isExpanded ? styles.expanded : ''}`}
              ref={descriptionRef}
              style={{
                WebkitLineClamp: isExpanded ? 'unset' : lineClamp,
                display: isExpanded ? 'block' : '-webkit-box'
              }}
            >
              {description}
            </div>
            {showButton && !isExpanded && <div className={styles.readMoreButton}>Читать далее</div>}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NewsItem;
