import * as React from 'react'
// import { Link } from 'react-router-dom'
// import instructions from '../../config/staticConfig'
import appState from '../../stateManager/index'

const InstructionsPage = (props: {num: number, onClick?: any}) => (
  <a onClick={(event) => {event.preventDefault(); appState.tab.add('专家信息维护')}}>
    <h1>
      当前有<span style={{color: 'red '}}>{props.num}</span>个专家待审核
    </h1>
  </a>
)

export default InstructionsPage