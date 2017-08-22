import * as React from 'react'
import { Form, Icon, Input, Button } from 'antd'
import FlexHorizontal from '../component/FlexHorizontal/index'
import FlexCenter from '../component/FlexCenter/index'
import { axios } from '../utils/index'
import appState from '../stateManager/index'

const FormItem = Form.Item
class Register extends React.Component<{}, {} > {
  username= ''
  password= ''
  passwordSecond= ''
  handleSubmit = async (e) => {
    e.preventDefault()
    if (this.password === this.passwordSecond) {
      try {
        const {data} = await axios.post('/auth/register', {
          'username': this.username,
          'password': this.password,
          'identity': 'user'
        })
        appState.accessToken = data.accessToken
        appState.identity = data.identity
        localStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('identity', data.identity)
      } catch (error) {
        alert(error.response.data.message)
      }
    } else {
      alert('密码不一致')
    }
  }
  render() {
    return (
      <FlexCenter>
        <FlexHorizontal center>
          <h1>专家征集系统注册</h1>
        </FlexHorizontal>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem help="请输入5-20个字母开头、可带数字、“_”、“.”的字串">
            <Input 
              prefix={<Icon type="user" style={{ fontSize: 13 }} />} 
              placeholder="用户名"
              onChange={(event) => {this.username = event.target.value}}
            />
          </FormItem>
          <FormItem help="密码由6-20个字符组成，区分大小写">
            <Input
              prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
              type="password"
              placeholder="密码"
              onChange={(event) => {this.password = event.target.value}}
            />
          </FormItem>
          <FormItem >
            <Input
              prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
              type="password"
              placeholder="密码确认"
              onChange={(event) => {this.passwordSecond = event.target.value}}
            />
          </FormItem>
          <FormItem>
            <div style={{margin: '0 auto', textAlign: 'center'}}>
              <Button type="primary" htmlType="submit" className="login-form-button">
                注册
              </Button>
            </div>
          </FormItem>
        </Form>
      </FlexCenter>
    )
  }
}
export default Register