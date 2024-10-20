import { useState, useEffect } from 'react'
import styles from '../../styles/shared/Board.module.css'
import { calculateBoardSize } from '../../utils/calculateBoardSize'
import { generateBoard } from '../../utils/generateBoard'

// 선택된 셀의 좌표를 추적하는 타입 정의
type SelectedCell = {
  row: number
  col: number
}

const Board = ({ words }: { words: string[] }) => {
  const [board, setBoard] = useState<string[][]>([])
  const [selectedCells, setSelectedCells] = useState<SelectedCell[]>([])
  const { rows, cols } = calculateBoardSize(words)

  const handleMouseDown = (row: number, col: number) => {
    setSelectedCells([...selectedCells, { row, col }])
  }

  const handleMouseOver = (row: number, col: number) => {
    if (selectedCells.length > 0) {
      setSelectedCells((prev) => {
        const lastSelected = prev[prev.length - 1]
        if (
          Math.abs(lastSelected.row - row) <= 1 &&
          Math.abs(lastSelected.col - col) <= 1
        ) {
          return [...prev, { row, col }]
        }
        return prev
      })
    }
  }

  const handleMouseUp = () => {
    if (selectedCells.length > 0) {
      const selectedWord = selectedCells
        .map((cell) => board[cell.row][cell.col])
        .join('')
      console.log('Selected word:', selectedWord)
      // todo: 단어 확인 및 결과 처리 로직을 추가
    }
    setSelectedCells([]) // 선택 초기화
  }

  useEffect(() => {
    const generatedBoard = generateBoard(rows, cols, words)
    setBoard(generatedBoard)
  }, [words, rows, cols])

  return (
    <div className={styles.board}>
      {board.map((row, i) => (
        <div key={i} className={styles.row}>
          {row.map((cell, j) => {
            const isSelected = selectedCells.some(
              (c) => c.row === i && c.col === j
            )
            return (
              <div
                key={j}
                className={`${styles.cell} ${
                  isSelected ? styles.selected : ''
                }`}
                onMouseDown={() => handleMouseDown(i, j)}
                onMouseOver={() => handleMouseOver(i, j)}
                onMouseUp={handleMouseUp}
              >
                {cell}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default Board
