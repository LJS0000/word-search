import styles from '../styles/HomePage.module.css';
import Board from '../components/shared/Board';

const HomePage = () => {
  return (
    <div className={styles.home}>
      <aside className={`${styles.sidebar} ${styles.leftSide}`}>??</aside>
      <main className={styles.mainContainer}>
        <Board />
      </main>
      <aside className={`${styles.sidebar} ${styles.rightSide}`}>??</aside>
    </div>
  );
};
export default HomePage;
