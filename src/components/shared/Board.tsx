import { useState, useEffect } from 'react'
import { calculateBoardSize } from '../../utils/calculateBoardSize'
import { generateBoard } from '../../utils/generateBoard'
import styles from '../../styles/shared/Board.module.css'
import Dragger from './Dragger'

const Board = ({ words }: { words: string[] }) => {
  const [board, setBoard] = useState<string[][]>([])
  const [draggerSize, setDraggerSize] = useState(0)
  const { rows, cols } = calculateBoardSize(words)

  const calculateDraggerSize = () => {
    const cellSize = Math.min(
      window.innerWidth / cols,
      window.innerHeight / rows
    )

    setDraggerSize(cellSize / 4)
  }

  useEffect(() => {
    const generatedBoard = generateBoard(rows, cols, words)
    setBoard(generatedBoard)
    calculateDraggerSize()
  }, [words, rows, cols])

  return (
    <div className={styles.board}>
      {board.map((row, i) => (
        <div key={i} className={styles.row}>
          {row.map((cell, j) => {
            return (
              <div key={j} className={styles.cell}>
                <span className={styles.letter}>{cell}</span>
              </div>
            )
          })}
        </div>
      ))}
      <Dragger draggerSize={draggerSize} />
    </div>
  )
}

export default Board
