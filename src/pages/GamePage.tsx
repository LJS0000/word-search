import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchDocumentById } from '../services/databaseService'
import styles from '../styles/GamePage.module.css'
import Board from '../components/shared/Board'

const GamePage = () => {
  const { id } = useParams<{ id: string }>()
  const [gameData, setGameData] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const data = await fetchDocumentById('games', id)
          setGameData(data)
        } catch (err) {
          console.error('Error fetching game data: ', err)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchData()
  }, [id])

  if (loading) {
    return <div className={styles.loading}>Loading...</div>
  }

  if (!gameData) {
    return <div className={styles.loading}>No game found</div>
  }

  console.log(gameData)

  return (
    <div className={styles.gameContainer}>
      <div className={styles.gameInfo}>
        <h2>{gameData.title}</h2>
        <p>{gameData.desc}</p>
      </div>
      {/* todo: 전역상태관리로 사이드바로 빼기 */}
      {/* <ul>
        {gameData.wordList.map((word: string) => (
          <li key={word}>{word}</li>
        ))}
      </ul> */}
      <Board />
    </div>
  )
}
export default GamePage
