import * as React from 'react'
import { Form, Input, Button } from 'antd'
import FlexHorizontal from '../../component/FlexHorizontal/index'
import { axios } from '../../utils/index'
import appState from '../../stateManager/index'
const FormItem = Form.Item
class ChangeSecret extends React.Component<any, any> {
  inputArr= ['now', 'new1', 'new2']
  handleSubmit = async (e: Event) => {
    e.preventDefault()
    this.inputArr.forEach(value => {
      console.log(e.target[value].value)
    })
    // tslint:disable-next-line:no-string-literal
    const [now, new1, new2] = [e.target['now'].value, e.target['new1'].value, e.target['new2'].value]
    if (new1 === new2) {
      try {
        const {data} = await axios.post('/auth/change', {
          'accessToken': appState.accessToken,
          'oldPassword': now,
          'newPassword': new1
        })
        if (data.ok === 'ok') alert('修改成功')
          else alert('修改失败')
      } catch (error) {
        alert(error.response.data.message)
      }
    } else {
      alert('两次密码不一致')
    }
  }
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    }
    return(
      <div style={{width: '400px', maxWidth: '80%'}}>
        <Form onSubmit={this.handleSubmit as any}> {/*Form的types有点问题*/}
          <FormItem label="当前密码" {...formItemLayout as any}>
            <Input 
              type="password"
              placeholder="当前密码"
              name={this.inputArr[0]}
            />
          </FormItem>
          <FormItem help="密码由6-20个字符组成，区分大小写" label="新密码" {...formItemLayout as any}>
            <Input
              type="password"
              placeholder="新密码"
              name={this.inputArr[1]}
            />
          </FormItem>
          <FormItem  label="确认密码" {...formItemLayout as any}>
            <Input
              type="password"
              placeholder="确认密码"
              name={this.inputArr[2]}
            />
          </FormItem>
          <FlexHorizontal center>
            <Button type="primary" htmlType="submit" className="login-form-button">
              提交
            </Button>
          </FlexHorizontal>
        </Form>
      </div>
    )
  }
}
export default ChangeSecret