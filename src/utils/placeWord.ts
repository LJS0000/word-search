import { getRandomInt } from './getRandomInt'

// 단어 방향 (수평, 수직, 대각선)
export const DIRECTIONS = [
  [0, 1], // 오른쪽 (수평)
  [1, 0], // 아래쪽 (수직)
  [1, 1], // 대각선 아래 오른쪽
  [-1, 1], // 대각선 위 오른쪽
]

/**
 * 보드에 단어를 배치합니다.
 * @param board - 2D 문자열 배열 (보드)
 * @param word - 배치할 단어
 * @param rows - 보드의 행 개수
 * @param cols - 보드의 열 개수
 *
 * @remarks
 * 이 함수는 단어를 보드에 무작위로 배치합니다.
 * 단어가 보드에 들어갈 수 있는지 확인하고,
 * 들어갈 수 있다면 해당 자리에 배치합니다.
 * 들어갈 수 없다면, 다음번에 다시 시도합니다.
 */
export const placeWordOnBoard = (
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
