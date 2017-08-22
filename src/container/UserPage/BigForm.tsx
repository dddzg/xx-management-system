import * as React from 'react'
import { Input, Form, Row, Col, Select, DatePicker, Button } from 'antd'
const FormItem = Form.Item
const { TextArea } = Input
const Option  = Select.Option
import './BigForm.css'

// import FlexHorizontal from '../../component/FlexHorizontal/index'
// import data from './data.json'
import EditableTagGroup from '../../component/EditableTagGroup/index'
import EditableTable from '../../component/EditableTable/index'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { axios } from '../../utils/index'
import appState from '../../stateManager/index'
interface IData {
  [index: string]: {
    type: 'input' | 'select' | 'datePicker',
    content: string[],
    require?: boolean
  }
}
// const data = require('./data.json')
interface IBigFormProps {
  editable?: boolean,
  data ?: string
  mode?: string
}
// tslint:disable-next-line:max-line-length
const nameList = ['专家证书编号', '状态', '证书有效时间', '专家姓名', '专家性别', '出生日期', '政治面貌', '证件类型', '颁发机构', '证件编号', '最高学历', '最高学位', '职称', '证书编号', '职务', '从业时长', '是否退休', '是否兼职', '邮政编码', '电子邮件', '移动电话', '家庭电话', '工作单位', '详细通信地址', '毕业院校及专业', '资格证书名及编号', '评审经历', '工作经历', '业务专长', '工作业绩', '回避单位', '评审领域', '其他说明', '驳回理由', '审核结果']
@observer
class BigForm extends React.Component<IBigFormProps, {editable: boolean, [index: string]: any}> {
  static defaultProps = {
    editable: true,
    data: undefined,
    mode: 'user'
  }
  FormList= ['专家证书编号']
  data: IData
  formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    }
  @observable 评审经历= [{
    key: 0,
    时间: '2011-11-15',
    任务名称: '啦啦啦',
    任务描述: 'dzg',
    任务类型: 'llll'
  }, {
    key: 1,
    时间: '2011-11-15',
    任务名称: '啦啦啦',
    任务描述: 'dzg',
    任务类型: 'llll'
  }] 
  @observable 工作经历= [{
    key: 0,
    起始时间: '2011-11-15',
    终止时间: '2011-12-15',
    工作单位: '啦啦啦',
    职务: '啦啦啦',
    证明人: '啦啦啦'
  }]
  @observable 回避单位= [{
    key: 0,
    单位名称: 'lalala',
    是否工作单位: 'lalala'
  }]
  @observable 业务专长= ''
  @observable 工作业绩= ''
  @observable 其他说明= ''
  @observable 资格证书名及编号= []
  @observable 驳回理由= ''
  @observable 审核结果= ''
  @observable 评审领域: string[]= []
  @observable loading= true
  constructor(props: IBigFormProps) {
    super(props)
    this.data = require('./data.json')
    this.state = {
      editable: props.editable
    }
    this.评审经历 = this.评审经历  || []
    this.工作经历 = this.工作经历  || []
    this.回避单位 = this.回避单位  || []
    console.log(this.data)
  }
  async componentWillMount () {
    let data
    console.log('dzg!!')
    console.log(this.props.data)
    if (this.props.data) {
      data = await axios.get(`/information/get?informationId=${this.props.data}`)
    } else {
      data = await axios.get(`/information/get?accessToken=${appState.accessToken}`)
    }
    data = data.data
    Object.entries(data).forEach(([key, value]) => {
      this[key] = value
    })
    console.log(this)
    this.loading = false
  }
  componentWillReceiveProps(nextProps: IBigFormProps) {
    if (this.state.editable !== nextProps.editable) {
      this.setState({editable: nextProps.editable})
    }
  }
  getContent= () => {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    }
    return (
      Object.entries(this.data).map(([key, value], index) => (
          <Col key={index} lg={12} xl={12} xs={24} sm={24}>
            <FormItem label={key} {...formItemLayout} required={value.require}>
              {
                (() => {
                  switch (value.type) {
                    case 'input':
                      return (<Input 
                        defaultValue={this[key] || ''}
                        placeholder={key}
                        disabled={!this.state.editable}
                        name={key}
                        onChange={(event) => {this[key] = event.target.value}}
                      />)
                    case 'select':
                      return (
                        <Select 
                          placeholder={`请选择${key}`}
                          disabled={!this.state.editable}
                          defaultValue={this[key] || ''}
                          onChange={(newValue) => {this[key] = newValue}}
                        >
                          {
                            value.content.map((v1, i1) => (
                              <Option value={v1} key={i1}>{v1}</Option>
                            ))
                          }
                        </Select>
                      )
                    case 'datePicker':
                      return <DatePicker 
                        disabled={!this.state.editable}
                        onChange={(_, newValue) => {this[key] = newValue}}
                      />
                    default:
                      // tslint:disable-next-line:no-string-literal
                      return <div>{this['状态'] || '待审核'}</div>
                  }
                })()
              }
            </FormItem>
          </Col>
        )
      )
    )
  }
  onSubmit = async (e) => {
    e.preventDefault()
    this.资格证书名及编号 = (this.refs.资格证书名及编号 as any).state.tags
    console.log(this)
    const data: any = {}
    nameList.forEach(value => data[value] = this[value])
    // tslint:disable-next-line:no-string-literal
    data.状态 = this['状态'] || '待审核'
    data.回避单位 = data.回避单位.slice()
    data.工作经历 = data.工作经历.slice()
    data.评审经历 = data.评审经历.slice()
    data.评审领域 = data.评审领域.slice()
    data.资格证书名及编号 = data.资格证书名及编号.join('|')
    if (this.props.mode === 'user') {
      delete data.驳回理由
      delete data.审核结果
      data.accessToken = appState.accessToken
    } else {
      data.id = this.props.data
    }
    try {
      const p = await axios.post('./information/set', data)
      alert('提交成功')
      console.log(p.data)
    } catch (error) {
      alert(error.response.data.message)
    }
  }
  render() {
    if (this.loading) return (
      <div>loading</div>
    )
    return (
      <div style={{maxWidth: '1024px'}}>
        <Row>
          <Form
            onSubmit={this.onSubmit}
          >
            <Col span={24}>
              <h1>基本信息</h1>
            </Col>
            {
              this.getContent()
            }
            <Col span={24}>
              <FormItem label="资格证书名及编号" labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}>
                <EditableTagGroup 
                  defaultValue={this.资格证书名及编号 || []} 
                  maxNumber={10} 
                  placeholder="资格证书名及编号（资格证书/编号）" 
                  disabled={!this.state.editable}
                  // tslint:disable-next-line:jsx-no-string-ref
                  ref="资格证书名及编号"
                />
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label="评审领域" labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} required>
                  <Select
                    defaultValue={this.评审领域 || []}
                    mode="multiple"
                    placeholder="请选择评审领域(最多选择2项)"
                    // tslint:disable-next-line:no-string-literal
                    value={this.评审领域.slice()}
                    onChange={(newValue: string[]) => { 
                        if (newValue.length <= 2) {
                          this.评审领域 = newValue
                        }else {
                          alert('最多选择2项')
                        }
                      }}
                    disabled={!this.state.editable}
                  >
                    {
                      ['幼儿园教育评估', '小学教育评估', '中学教育评估', '高职教育评估' , '高校教育评估']
                      .map((value, index) => <Option key={index} value={value}>{value}</Option>)
                    }
                  </Select>
              </FormItem>
            </Col>
            <Col span={24}>
              <h1>评估/评审经历
                <Button 
                  onClick={() => {
                    this.评审经历.push({
                      key: this.评审经历.length, 
                      时间: '', 
                      任务名称: '', 
                      任务描述: '',
                      任务类型: ''
                    })
                    console.log(this.评审经历)
                  }}
                  size="large"
                  disabled={!this.state.editable}
                >
                  添加评估/评审经历
                </Button>  
              </h1>
              <EditableTable 
                data={this.评审经历} 
                colums={['时间', '任务名称', '任务描述', '任务类型']} 
                disabled={!this.state.editable}
              />
            </Col>
            <Col span={24}>
              <h1>工作经历
              <Button 
                onClick={() => {
                  this.工作经历.push({
                    key: this.工作经历.length, 
                    起始时间: '', 
                    终止时间: '', 
                    工作单位: '',
                    职务: '',
                    证明人: ''
                  })
                  console.log(this.工作经历)
                }}
                disabled={!this.state.editable}
                size="large"
              >
                增加工作经历
              </Button>  
              </h1>
              <EditableTable 
                data={this.工作经历} 
                colums={['起始时间', '终止时间', '工作单位', '职务', '证明人']} 
                disabled={!this.state.editable}
              />
            </Col>
            <Col span={24}>
              <h1>业务专长(不超过300字)</h1>
              <TextArea 
                defaultValue={this.业务专长 || ''}
                disabled={!this.state.editable}
                rows={4} 
                autosize={false} 
                onChange={(e) => {
                  if (e.target.value.length <= 300) {
                    this.业务专长 = e.target.value
                  } else {
                    alert(`${e.target.value.length}字，超过300字限制`)
                  } 
                }}
              />
            </Col>
            <Col span={24}>
              <h1>工作业绩(不超过300字)</h1>
              <TextArea 
                defaultValue={this.工作业绩 || ''}
                disabled={!this.state.editable}
                rows={4} 
                autosize={false} 
                onChange={(e) => {
                  if (e.target.value.length <= 300) {
                    this.工作业绩 = e.target.value
                  } else {
                    alert(`${e.target.value.length}字，超过300字限制`)
                  } 
                }}
              />
            </Col>
            <Col span={24}>
              <h1>回避单位
              <Button 
                onClick={() => {
                  this.回避单位.push({
                    key: this.回避单位.length, 
                    单位名称: '',
                    是否工作单位: ''
                  })
                  console.log(this.回避单位)
                }}
                size="large"
                disabled={!this.state.editable}
              >
                增加回避单位
              </Button>  
              </h1>
              <EditableTable 
                data={this.回避单位} 
                colums={['单位名称', '是否工作单位']}
                disabled={!this.state.editable}
              />
            </Col>
            <Col span={24}>
              <h1>其他说明(不超过300字)</h1>
              <TextArea 
                defaultValue={this.工作业绩 || ''}
                disabled={!this.state.editable}
                rows={4} 
                autosize={false} 
                onChange={(e) => {
                  if (e.target.value.length <= 300) {
                    this.其他说明 = e.target.value
                  } else {
                    alert(`${e.target.value.length}字，超过300字限制`)
                  } 
                }}
              />
            </Col>
            <Col span={24} style={{textAlign: 'center', marginTop: 16}}>
              <FormItem>
                  {
                    this.props.mode === 'user'
                    ? 
                    <div style={{display: 'inline-block'}}>
                      <Button style={{margin: '0 10px'}} onClick={() => {this.setState({editable: true})}}>编辑</Button>
                      <Button style={{margin: '0 10px'}} onClick={() => {this.setState({editable: false})}}>保存</Button> 
                    </div>
                    :
                    <div>
                      <Button style={{margin: '0 10px'}} onClick={() => {this.审核结果 = '同意申请'}}>同意申请</Button>
                      <Button style={{margin: '0 10px'}} onClick={() => {this.审核结果 = '驳回申请'}}>驳回申请</Button>
                      <Button style={{margin: '0 10px'}} onClick={() => {this.审核结果 = '终止资格'}}>终止资格</Button>
                      <h1>请填写<span style={{color: 'red'}}>{this.审核结果}</span>原因
                        <span style={{fontSize: 10}}>(已输入{this.驳回理由.length}字,还可以输入{500 - this.驳回理由.length}字)</span>
                      </h1>
                      <TextArea 
                        defaultValue={this.驳回理由 || ''}
                        rows={4} 
                        autosize={false} 
                        onChange={(e) => {
                          if (e.target.value.length <= 500) {
                            this.驳回理由 = e.target.value
                          } else {
                            alert(`${e.target.value.length}字，超过500字限制`)
                          } 
                        }}
                      />
                    </div>
                  }
                  <Button style={{margin: '0 10px'}} htmlType="submit">提交</Button>
              </FormItem>
            </Col>
          </Form>
        </Row>
      </div >
    )
  }
}

export default BigForm