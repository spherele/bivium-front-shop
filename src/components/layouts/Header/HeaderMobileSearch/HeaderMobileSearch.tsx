import { FC, useEffect, useState, useRef } from 'react';
import SearchIcon from '@icons/search.svg';
import styles from './HeaderMobileSearch.module.css';

interface Props {
  onSubmit: (query: string) => void;
}

const HeaderMobileSearch: FC<Props> = ({ onSubmit }) => {
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const searchInput = searchInputRef.current!;

    const searchHandler = () => {
      if (searchInput.value.length) {
        onSubmit(searchInput.value);
        searchInput.value = '';
        setIsShown(false);
      }
    };

    searchInput.addEventListener('search', searchHandler);
    return () => searchInput.removeEventListener('search', searchHandler);
  }, [onSubmit]);

  return (
    <>
      <button className={styles.button} type='button' onClick={() => setIsShown(!isShown)}>
        <SearchIcon />
      </button>
      <div className={styles.search} style={{ display: !isShown ? 'none' : '' }}>
        <input ref={searchInputRef} className={styles.searchControl} type='search' placeholder='Поиск по товарам' />
      </div>
    </>
  );
};

export default HeaderMobileSearch;
