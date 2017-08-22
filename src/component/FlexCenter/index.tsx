import * as React from 'react'
import './index.css'
const FlexCenter = ({children}) => {
  return (
    <div className="FlexCenter">
      <div 
        style={{
          width: '600px',
          maxWidth: '90%'
        }}
      >
        {children}
      </div>
    </div>
  )
}
export default FlexCenter