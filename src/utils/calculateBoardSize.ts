/**
 * 주어진 words 배열을 배치할 때 필요한 최소한의 보드 크기를 계산합니다.
 * @param words - 단어 배열
 * @returns rows, cols 크기 정보
 */
export const calculateBoardSize = (words: string[]) => {
  const longestWord = Math.max(...words.map((word) => word.length))
  const totalLetters = words.reduce((acc, word) => acc + word.length, 0)

  // 적절한 보드 크기 계산
  const size = Math.max(longestWord, Math.ceil(Math.sqrt(totalLetters)) + 2)

  return {
    rows: size,
    cols: size,
  }
}
