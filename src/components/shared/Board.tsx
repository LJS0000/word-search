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
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [selectedCells, setSelectedCells] = useState<SelectedCell[]>([])
  const { rows, cols } = calculateBoardSize(words)

  const handleMouseDown = (row: number, col: number) => {
    setSelectedCells([{ row, col }])
    setIsMouseDown(true)
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
    setIsMouseDown(false)
  }

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isMouseDown) {
      const boardElement = event.currentTarget
      const rect = boardElement.getBoundingClientRect()
      const cellSize = rect.width / cols // 각 셀의 가로 길이

      // 마우스의 현재 위치로 셀 좌표 계산
      const row = Math.floor((event.clientY - rect.top) / cellSize)
      const col = Math.floor((event.clientX - rect.left) / cellSize)

      // 범위를 초과하지 않도록 확인
      if (row >= 0 && row < rows && col >= 0 && col < cols) {
        // 대각선 및 직선 이동 체크
        const lastSelected = selectedCells[selectedCells.length - 1]
        const rowDiff = row - lastSelected.row
        const colDiff = col - lastSelected.col

        if (
          (Math.abs(rowDiff) <= 1 && colDiff === 0) || // 수직
          (Math.abs(colDiff) <= 1 && rowDiff === 0) || // 수평
          (Math.abs(rowDiff) === Math.abs(colDiff) && Math.abs(rowDiff) === 1) // 대각선
        ) {
          setSelectedCells((prev) => {
            // 중복 선택 방지
            if (!prev.some((c) => c.row === row && c.col === col)) {
              return [...prev, { row, col }]
            }
            return prev
          })
        }
      }
    }
  }

  useEffect(() => {
    const generatedBoard = generateBoard(rows, cols, words)
    setBoard(generatedBoard)
  }, [words, rows, cols])

  return (
    <div
      className={styles.board}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
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
