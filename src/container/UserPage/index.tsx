import * as React from 'react'
// import { Link } from 'react-router-dom'
import instructions from '../../config/staticConfig'

const InstructionsPage = () => (
  <div>
    <h1>填表说明</h1>
    <div>
      {
        instructions.map((value, index) => (
          <h2 key={index}>
            {index}.{value}
          </h2>
        ))
      }
    </div>
  </div>
)

export default InstructionsPage