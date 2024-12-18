import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useWordContext } from '../context/wordContext'
import { fetchDocumentById } from '../services/databaseService'
import styles from '../styles/GamePage.module.css'
import Board from '../components/shared/Board'

const GamePage = () => {
  const [loading, setLoading] = useState(true)
  const [gameData, setGameData] = useState<any | null>(null)
  const { id } = useParams<{ id: string }>()
  const { setWords, userAnswer } = useWordContext()

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const data = await fetchDocumentById('games', id)
          setGameData(data)
          setWords(data.wordList)
        } catch (err) {
          console.error('Error fetching game data: ', err)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchData()
  }, [id, setWords])

  if (loading) {
    return <div className={styles.loading}>Loading...</div>
  }

  if (!gameData) {
    return <div className={styles.loading}>No game found</div>
  }

  return (
    <div className={styles.gameContainer}>
      <div className={styles.gameInfo}>
        <h2>{gameData.title}</h2>
        <p>{gameData.desc}</p>
      </div>
      <Board words={gameData.wordList} />
      <div className={styles.answerWrapper}>
        <p>Your answer is</p>
        {userAnswer.length > 0 ? (
          <span className={styles.correctAnswer}>
            {userAnswer.toUpperCase()}
          </span>
        ) : (
          <span>...</span>
        )}
      </div>
    </div>
  )
}
export default GamePage
