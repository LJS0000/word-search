import { useLocation } from 'react-router-dom'
import styles from '../styles/Layout.module.css'
import Header from './Header'
import GameListSidebar from './GameListSidebar'
import GameStatusSidebar from './GameStatusSidebar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const isGamePage = location.pathname.startsWith('/game')

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.contents}>
        <aside className={`${styles.sidebar} ${styles.leftSide}`}>
          {isGamePage && <GameStatusSidebar />}
        </aside>
        <main className={styles.main}>{children}</main>
        <aside className={`${styles.sidebar} ${styles.rightSide}`}>
          {isHomePage && <GameListSidebar />}
        </aside>
      </div>
    </div>
  )
}

export default Layout
