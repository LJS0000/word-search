import { useLocation } from 'react-router-dom';
import styles from '../styles/Layout.module.css';
import Header from './Header';
import GameListSidebar from './GameListSidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.contents}>
        <aside className={`${styles.sidebar} ${styles.leftSide}`}>left</aside>
        <main className={styles.main}>{children}</main>
        <aside className={`${styles.sidebar} ${styles.rightSide}`}>
          {isHomePage && <GameListSidebar />}
        </aside>
      </div>
    </div>
  );
};

export default Layout;
