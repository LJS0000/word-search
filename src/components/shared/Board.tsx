import { useState, useEffect, memo } from 'react'
import { useWordContext } from '../../context/wordContext'
import { calculateBoardSize } from '../../utils/calculateBoardSize'
import { generateBoard } from '../../utils/generateBoard'
import styles from '../../styles/shared/Board.module.css'
import Dragger from './Dragger'

const Board = ({ words }: { words: string[] }) => {
  const { setUserAnswer } = useWordContext()

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
    handleMatch()
    setIsDragging(false)
    setSelectedCells([])
  }

  const handleMatch = () => {
    if (selectedCells.length > 0) {
      const selectedWord = selectedCells
        .map((cell) => board[cell.y][cell.x])
        .join('')
        .toLowerCase()

      setUserAnswer(selectedWord)

      if (words.includes(selectedWord)) {
        console.log('Correct word found:', selectedWord)
      } else {
        console.log('Incorrect word:', selectedWord)
      }
    }
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
                onMouseUp={handleMouseUp}
              >
                <span
                  className={`${styles.letter} ${
                    isSelected ? styles.selected : ''
                  }`}
                  onMouseDown={() => setIsDragging(true)}
                  onMouseOver={() => selectCell(j, i)}
                  onMouseUp={handleMouseUp}
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

export default memo(Board)
