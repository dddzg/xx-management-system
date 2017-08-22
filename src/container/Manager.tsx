import * as React from 'react'
import { Layout, Menu, Icon } from 'antd'
import MultiTab from '../component/MultiTab/index'
import InstructionsPage from './ManagerPage/index'
import ChangeSecret from './UserPage/ChangeSecret'
import InfoMaintain from './ManagerPage/infoMaintain'
import appState from '../stateManager/index'
import { Redirect } from 'react-router-dom'
import { axios } from '../utils/index'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
const { Content, Footer, Sider } = Layout

const config = new Map([ 
  ['首页', <InstructionsPage num={0}/>],
  ['专家信息维护', <InfoMaintain/>],
  ['密码修改', <ChangeSecret/>]
])
@observer
class Manager extends React.Component<{}, {}> {
  @observable loading= true
  addTab= (tabName: string) => {
    appState.tab.add(tabName)
  }
  async componentWillMount() {
    const {data} = await axios.get('/information/getCount')
    config.set('首页', <InstructionsPage num={data}/>)
    this.loading = false
  }
  render() {
    if (!(appState.accessToken && appState.identity === 'manager')) {
      return <Redirect to="/login" />
    } 
    if (this.loading) return <div>loading</div> 
    return (
      <Layout>
        <Sider>  
          <div className="logo" />
          <Menu 
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['首页']} 
            onSelect={(item: {key: string}) => {
              this.addTab(item.key)
            }}
          >
            <Menu.Item key="首页" >
              <Icon type="user" />
              <span className="nav-text">首页</span>
            </Menu.Item>
            <Menu.Item key="专家信息维护">
              <Icon type="video-camera" />
              <span className="nav-text">专家信息维护</span>
            </Menu.Item>
            <Menu.Item key="密码修改">
              <Icon type="upload" />
              <span className="nav-text">密码修改</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          {/*<Header style={{ background: '#fff', padding: 0 }} >
            <h1 style={{marginLeft: '16px'}}>神奇的专家征集系统</h1>
          </Header>*/}
          <Content style={{ margin: '8px 16px 0', minHeight: '1000px' }}>
            <MultiTab 
              config={config}
              ref={ref => {
                // tslint:disable-next-line:curly
                if (ref) appState.tab = ref
              }}
            />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            神奇的专家征集系统
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Manager