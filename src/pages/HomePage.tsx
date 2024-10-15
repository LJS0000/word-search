import styles from '../styles/HomePage.module.css';
import Board from '../components/shared/Board';

const HomePage = () => {
  return (
    <div className={styles.mainContainer}>
      <Board />
    </div>
  );
};
export default HomePage;
