import { getRandomInt } from './getRandomInt'
import { placeWordOnBoard } from './placeWord'

/**
 * 보드를 생성합니다.
 * @param rows - 보드의 행 개수
 * @param cols - 보드의 열 개수
 * @param words - 보드에 배치할 단어리스트
 * @returns 2D 배열 형식의 보드
 */
export const generateBoard = (rows: number, cols: number, words: string[]) => {
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
