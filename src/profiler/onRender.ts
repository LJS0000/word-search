export const onRender = (
  id: string,
  phase: string,
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number
) => {
  console.table({
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
  })
}
