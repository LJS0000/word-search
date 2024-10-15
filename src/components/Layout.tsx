import Header from './Header';
import styles from '../styles/Layout.module.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.contents}>
        <aside className={`${styles.sidebar} ${styles.leftSide}`}>left</aside>
        <main className={styles.main}>{children}</main>
        <aside className={`${styles.sidebar} ${styles.rightSide}`}>right</aside>
      </div>
    </div>
  );
};

export default Layout;
