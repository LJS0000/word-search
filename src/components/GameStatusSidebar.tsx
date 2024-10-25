import { useWordContext } from '../context/wordContext'
import styles from '../styles/GameStatusSidebar.module.css'

const GameStatusSidebar = () => {
  const { words } = useWordContext()

  if (words.length === 0) {
    return (
      <div className={styles.helpText}>
        <p>Sorry! No words found</p>
      </div>
    )
  }

  return (
    <div className={styles.wordListContainer}>
      <h3>✅ List of words to match</h3>
      <ul className={styles.wordListWrapper}>
        {words.map((word) => {
          const isCorrect = true
          return (
            <li key={word} className={isCorrect ? styles.correct : ''}>
              {word.toUpperCase()}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default GameStatusSidebar
