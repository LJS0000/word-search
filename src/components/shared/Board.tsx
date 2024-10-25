import { useState, useEffect } from 'react'
import { calculateBoardSize } from '../../utils/calculateBoardSize'
import { generateBoard } from '../../utils/generateBoard'
import styles from '../../styles/shared/Board.module.css'
import Dragger from './Dragger'

const Board = ({ words }: { words: string[] }) => {
  const [board, setBoard] = useState<string[][]>([])
  const [draggerSize, setDraggerSize] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedCells, setSelectedCells] = useState<
    { x: number; y: number }[]
  >([])

  const { rows, cols } = calculateBoardSize(words)

  const calculateDraggerSize = () => {
    const cellSize = Math.min(
      window.innerWidth / cols,
      window.innerHeight / rows
    )

    setDraggerSize(cellSize / 4)
  }

  const selectCell = (x: number, y: number) => {
    if (!isDragging) {
      return
    }

    if (selectedCells.some((cell) => cell.x === x && cell.y === y)) {
      setSelectedCells(
        selectedCells.filter((cell) => cell.x !== x || cell.y !== y)
      )
      return
    }

    setSelectedCells([...selectedCells, { x, y }])
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setSelectedCells([])
  }

  useEffect(() => {
    const generatedBoard = generateBoard(rows, cols, words)
    setBoard(generatedBoard)
    calculateDraggerSize()
  }, [words, rows, cols])

  return (
    <div className={styles.board} onMouseLeave={handleMouseUp}>
      {board.map((row, i) => (
        <div key={i} className={styles.row}>
          {row.map((cell, j) => {
            const isSelected = selectedCells.some(
              (cell) => cell.x === j && cell.y === i
            )
            return (
              <div
                key={j}
                className={styles.cell}
                onMouseDown={() => setIsDragging(true)}
                onMouseOver={() => selectCell(j, i)}
                onMouseUp={handleMouseUp}
              >
                <span
                  className={`${styles.letter} ${
                    isSelected ? styles.selected : ''
                  }`}
                >
                  {cell}
                </span>
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
