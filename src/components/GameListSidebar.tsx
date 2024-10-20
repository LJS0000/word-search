import { useEffect, useState } from 'react'
import { fetchCollectionData } from '../services/databaseService'
import styles from '../styles/GameListSidebar.module.css'
import { Link } from 'react-router-dom'

const GameListSidebar = () => {
  const [games, setGames] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCollectionData('games')
      setGames(data)
    }
    fetchData()
  }, [])

  //todo: 페이지네이션 추가
  //todo: 검색 기능 추가

  return (
    <div className={styles.gameListContainer}>
      <div className={styles.titleWrapper}>
        <h2>Game List</h2>
        <div></div>
      </div>

      {games.length === 0 && (
        <div>
          <p>No games available...</p>
          <Link to='/create' className={styles.createLink}>
            How about creating one?
          </Link>
        </div>
      )}
      <ul className={styles.gameList}>
        {games.map((game) => (
          <li key={game.id}>
            <Link to={`/game/${game.id}`}>
              <div className={styles.gameWrapper}>
                <p>{game.title}</p>
                <span>{game.desc}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GameListSidebar
