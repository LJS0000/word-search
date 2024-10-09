import Header from './Header';
import styles from '../styles/Layout.module.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.layout}>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
