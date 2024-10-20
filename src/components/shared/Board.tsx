import { useState, useEffect } from 'react'
import styles from '../../styles/shared/Board.module.css'
import { calculateBoardSize } from '../../utils/calculateBoardSize'
import { generateBoard } from '../../utils/generateBoard'

const Board = ({ words }: { words: string[] }) => {
  const [board, setBoard] = useState<string[][]>([])
  const { rows, cols } = calculateBoardSize(words) // 보드 크기 계산

  useEffect(() => {
    const generatedBoard = generateBoard(rows, cols, words)
    setBoard(generatedBoard)
  }, [words, rows, cols])

  return (
    <div className={styles.board}>
      {board.map((row, i) => (
        <div key={i} className={styles.row}>
          {row.map((cell, j) => (
            <div key={j} className={styles.cell}>
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Board
