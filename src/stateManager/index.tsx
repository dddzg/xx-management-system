import MultiTab from '../component/MultiTab/index'
import { computed, reaction, IReactionDisposer, observable } from 'mobx'
import { createHashHistory } from 'history'
// import {} from 'mobx-react'
class AppState {
  @observable accessToken = ''
  @observable identity = ''
  tab: MultiTab
  @computed get logined() {
    return this.accessToken !== ''
  }
  reaction: IReactionDisposer
  constructor() {
    this.reaction = reaction(() => this.accessToken, accessToken => { 
      console.log('123')
      createHashHistory().replace('/login')
    })
    let temp = localStorage.getItem('accessToken')
    if (temp) {
      this.accessToken = temp
      this.identity = localStorage.getItem('identity')
    }
  }
}
const appState = new AppState()
export default appState