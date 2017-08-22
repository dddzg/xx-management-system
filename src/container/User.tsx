import * as React from 'react'
import { Layout, Menu, Icon } from 'antd'
import MultiTab from '../component/MultiTab/index'
import InstructionsPage from './UserPage/index'
import ChangeSecret from './UserPage/ChangeSecret'
import BigForm from './UserPage/BigForm'
import appState from '../stateManager/index'
import { Redirect } from 'react-router-dom'
const { Content, Footer, Sider } = Layout

const config = new Map([ 
  ['首页', <InstructionsPage/>],
  ['专家信息填入', <BigForm data={undefined}/>],
  ['密码修改', <ChangeSecret/>]
])
class User extends React.Component<{}, {}> {
  tab: MultiTab
  addTab= (tabName: string) => {
    console.log(this.tab)
    this.tab.add(tabName)
  }
  render() {
    if (!(appState.accessToken && appState.identity === 'user')) {
      return <Redirect to="/login" />
    } 
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
            <Menu.Item key="专家信息填入">
              <Icon type="video-camera" />
              <span className="nav-text">专家信息填入</span>
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
                if (ref) this.tab = ref
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

export default User