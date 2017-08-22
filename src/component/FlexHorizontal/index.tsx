import * as React from 'react'
import './index.css'
interface FlexHorizontalProps {
  children: any,
  full?: boolean,
  center?: boolean
}
const FlexHorizontal = ({children, full, center}: FlexHorizontalProps) => {
  const getClassName = () => {
    if (full) {
      return 'FlexHorizontalFull'
    }
    if (center) {
      return 'FlexHorizontalCenter'
    }
    return 'FlexHorizontal'
  }
  return (
    <div className={getClassName()}>
      {children}
    </div>
  )
}
export default FlexHorizontal