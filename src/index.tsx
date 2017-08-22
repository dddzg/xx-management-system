import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './container/index'
import registerServiceWorker from './config/registerServiceWorker'
import './index.css'

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
