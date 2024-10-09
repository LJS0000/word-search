import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.css';
import { FiPlusCircle } from 'react-icons/fi';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to='/'>
        <h1 className={styles.title}>Word Search</h1>
      </Link>
      <Link to='/create' className={styles.addBtnContainer}>
        <span className={styles.addBtn}>
          <FiPlusCircle />
        </span>
        <p>New game</p>
      </Link>
    </header>
  );
};

export default Header;
