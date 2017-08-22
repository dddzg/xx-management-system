import * as React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox, Radio  } from 'antd'
import FlexHorizontal from '../component/FlexHorizontal/index'
import FlexCenter from '../component/FlexCenter/index'
import { axios } from '../utils/index'
import appState from '../stateManager/index'
import { createHashHistory } from 'history'
const FormItem = Form.Item
const RadioGroup = Radio.Group
class Login extends React.Component<{}, {
  id: number,
} > {
  username: string= ''
  password: string= ''
  // tslint:disable-next-line:typedef
  constructor(props) {
    super(props)
    this.state = {
      id: 1,
    }
  }
  handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post('/auth/login', {
        'username': this.username,
        'password': this.password,
        'identity': this.state.id === 1 ? 'user' : 'manager'
      })
      appState.accessToken = data.accessToken
      appState.identity = data.identity
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('identity', data.identity)
      createHashHistory().replace(`/${data.identity}`)
    } catch (error) {
      alert(error.response.data.message)
    }
  }
render() {
    if (appState.logined) {
      if (appState.identity === 'manager')
        return <Redirect to="/manager" />
      else return <Redirect to="/user" />
    }
    return (
      <FlexCenter>
        <FlexHorizontal center>
          <h1>专家征集系统登录</h1>
        </FlexHorizontal>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            <RadioGroup 
              onChange={(e) => {
                this.setState({
                  id: (e.target as any).value
                })
              }} 
              value={this.state.id}
            >
              <Radio value={1}>用户</Radio>
              <Radio value={2}>管理员</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem>
            <Input 
              prefix={<Icon type="user" style={{ fontSize: 13 }} />} 
              placeholder="用户名"
              name="username"
              onChange={(event) => {this.username = event.target.value}}
            />
          </FormItem>
          <FormItem>
            <Input
              prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
              type="password"
              placeholder="密码"
              name="password"
              onChange={(event) => {this.password = event.target.value}}
            />
          </FormItem>
          <FormItem>
            <FlexHorizontal>
              <Checkbox>记住我</Checkbox>
              <a className="login-form-forgot" href="">忘记密码</a>
            </FlexHorizontal>
            <FlexHorizontal full>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </FlexHorizontal>
            <FlexHorizontal center>
              <Link to="/register">
                注册
              </Link>
            </FlexHorizontal>
          </FormItem>
        </Form>
      </FlexCenter>
    )
  }
}
export default Login