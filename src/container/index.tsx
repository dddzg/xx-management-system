import * as React from 'react'
import {
  HashRouter as Router,
  // BrowserRouter ,
  Route
} from 'react-router-dom'
// import NoMatch from './NoMatch'
import Login from './Login'
import Register from './Register'
import User from './User'
import Manager from './Manager'
import { Redirect } from 'react-router-dom'

class App extends React.Component<{}, {}> {
  render() {
    return (
      <Router>
        <div>
          <Redirect from="/" to="login"/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/user" component={User}/>
          <Route path="/manager" component={Manager}/>
        </div>
        {/*<Route component={NoMatch}/>*/}
      </Router>
    )
  }
}
export default App