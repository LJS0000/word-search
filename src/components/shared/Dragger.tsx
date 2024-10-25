import { useState, useEffect } from 'react'
import styles from '../../styles/shared/Dragger.module.css'

const Dragger = ({ draggerSize = 8 }: { draggerSize?: number }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [startPosition, setStartPosition] = useState<{
    x: number
    y: number
  } | null>(null)
  const [currentLength, setCurrentLength] = useState(0)
  const [currentAngle, setCurrentAngle] = useState(0)

  /**
   * 드래그 중 마우스가 움직일 때 호출되는 함수
   * 드래그 시작 지점에서 마우스의 현재 위치를 계산해
   * 길이와 각도를 업데이트함
   * @param {MouseEvent} event 마우스 이벤트
   */
  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging && startPosition) {
      const deltaX = event.clientX - startPosition.x
      const deltaY = event.clientY - startPosition.y

      const length = Math.sqrt(deltaX ** 2 + deltaY ** 2)
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI)

      setCurrentLength(length)
      setCurrentAngle(angle)
    }
  }

  /**
   * 마우스를 클릭했을 때 호출되는 함수
   * 드래그 시작 위치를 저장하고 드래그 상태를 true로 설정
   * @param {MouseEvent} event 마우스 이벤트
   */
  const handleMouseDown = (event: MouseEvent) => {
    setStartPosition({ x: event.clientX, y: event.clientY })
    setIsDragging(true)
  }

  /**
   * 드래그를 종료할 때 호출되는 함수
   * 드래그 상태를 false로 설정하고 요소를 초기화
   */
  const handleMouseUp = () => {
    setIsDragging(false)
    setStartPosition(null)
    setCurrentLength(0)
    setCurrentAngle(0)
  }

  useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isDragging, startPosition])

  return (
    <div
      className={styles.dragger}
      style={{
        width: `${currentLength}px`, // 현재 길이
        height: `${draggerSize}px`, // 높이는 고정
        transform: `rotate(${currentAngle}deg)`,
        position: 'absolute',
        left: `${startPosition ? startPosition.x : 0}px`, // 드래그 시작 위치
        top: `${startPosition ? startPosition.y - 20 : 0}px`, // 드래그 시작 위치
        transformOrigin: '0 50%', // 회전 기준점 설정
      }}
    />
  )
}

export default Dragger
