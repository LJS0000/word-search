import { useState, useEffect } from 'react'
import { calculateBoardSize } from '../../utils/calculateBoardSize'
import { generateBoard } from '../../utils/generateBoard'
import styles from '../../styles/shared/Board.module.css'

// 선택된 셀의 좌표를 추적하는 타입 정의
type SelectedCell = {
  row: number
  col: number
}

const Board = ({ words }: { words: string[] }) => {
  const [board, setBoard] = useState<string[][]>([])
  const [selectedCells, setSelectedCells] = useState<SelectedCell[]>([])
  const { rows, cols } = calculateBoardSize(words)

  useEffect(() => {
    const generatedBoard = generateBoard(rows, cols, words)
    setBoard(generatedBoard)
  }, [words, rows, cols])

  return (
    <>
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
      </div>
    </>
  )
}

export default Board
