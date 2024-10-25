import { useEffect, useState } from 'react'
import { useWordContext } from '../context/wordContext'
import styles from '../styles/GameStatusSidebar.module.css'

const GameStatusSidebar = () => {
  const { words, userAnswer } = useWordContext()

  const [leftAnswerList, setLeftAnswerList] = useState<string[]>(
    JSON.parse(JSON.stringify(words))
  )

  const matchWord = () => {
    if (userAnswer && leftAnswerList.includes(userAnswer)) {
      setLeftAnswerList((prevList) =>
        prevList.filter((word) => word !== userAnswer)
      )
    }
  }

  useEffect(() => {
    matchWord()
  }, [userAnswer])

  useEffect(() => {
    setLeftAnswerList(JSON.parse(JSON.stringify(words)))
  }, [words])

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
          const isCorrect: boolean = !leftAnswerList.includes(word)
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
