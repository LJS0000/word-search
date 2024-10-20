import { useState, useEffect } from 'react'
import styles from '../../styles/shared/Board.module.css'

// 단어 방향 (수평, 수직, 대각선)
const DIRECTIONS = [
  [0, 1], // 오른쪽 (수평)
  [1, 0], // 아래쪽 (수직)
  [1, 1], // 대각선 아래 오른쪽
  [-1, 1], // 대각선 위 오른쪽
]

// 0 이상 max 미만의 랜덤한 정수를 생성
const getRandomInt = (max: number) => Math.floor(Math.random() * max)

const placeWordOnBoard = (
  board: string[][],
  word: string,
  rows: number,
  cols: number
) => {
  let placed = false

  while (!placed) {
    const direction = DIRECTIONS[getRandomInt(DIRECTIONS.length)]
    const startRow = getRandomInt(rows)
    const startCol = getRandomInt(cols)

    let canPlace = true
    let row = startRow
    let col = startCol

    // 단어가 보드에 들어갈 수 있는지 확인
    for (let i = 0; i < word.length; i++) {
      if (
        row < 0 ||
        row >= rows ||
        col < 0 ||
        col >= cols ||
        (board[row][col] && board[row][col] !== word[i])
      ) {
        canPlace = false
        break
      }
      row += direction[0]
      col += direction[1]
    }

    // 단어를 보드에 배치
    if (canPlace) {
      row = startRow
      col = startCol
      for (let i = 0; i < word.length; i++) {
        board[row][col] = word[i]
        row += direction[0]
        col += direction[1]
      }
      placed = true
    }
  }
}

const generateBoard = (rows: number, cols: number, words: string[]) => {
  const board: string[][] = Array.from({ length: rows }, () =>
    Array(cols).fill('')
  )

  words.forEach((word) =>
    placeWordOnBoard(board, word.toUpperCase(), rows, cols)
  )

  // 빈 칸을 무작위 알파벳으로 채움
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (!board[i][j]) {
        board[i][j] = String.fromCharCode(65 + getRandomInt(26)) // A-Z 랜덤 글자
      }
    }
  }

  return board
}

// 자동으로 rows와 cols 값을 계산하는 함수
const calculateBoardSize = (words: string[]) => {
  const longestWord = Math.max(...words.map((word) => word.length))
  const totalLetters = words.reduce((acc, word) => acc + word.length, 0)

  // 적절한 보드 크기 계산
  const size = Math.max(longestWord, Math.ceil(Math.sqrt(totalLetters)) + 2)

  return {
    rows: size,
    cols: size,
  }
}

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
