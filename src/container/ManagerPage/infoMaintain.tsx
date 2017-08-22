import * as React from 'react'
import { Table, Select, Button } from 'antd'
const Option = Select.Option
import appState from '../../stateManager/index'
import BigForm from '../UserPage/BigForm'
import './infoMaintain.css'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { axios } from '../../utils/index'
@observer
export default class InfoMaintain extends React.Component {
  columns = [{
      title: '专家编号',
      dataIndex: '专家证书编号',
    }, {
      title: '专家名',
      dataIndex: '专家姓名',
    }, {
      title: '工作单位',
      dataIndex: '工作单位',
    }, {
      title: '联系电话',
      dataIndex: '移动电话',
    }, {
      title: '入库类型',
      dataIndex: '入库类型',
      render: () => <div>注册</div>
    }, {
      title: '状态',
      dataIndex: '状态',
    }, {
      title: '操作',
      dataIndex: '操作',
      render: (text, record) => {
        console.log(record)
        return(
          <span>
            <a 
              href="#"
              onClick={(event) => {
                event.preventDefault()
                appState.tab.addItem({
                  title: '专家详细信息',
                  content: <BigForm data={record.id} editable={false} mode={'manager'}/>,
                  key: '专家详细信息' + String(record.id)
                })
              }}
            >
              显示评项目
            </a>
          </span>
        )}
    }
  ]
  initData = []
  @observable loading= true
  @observable displayData= this.initData
  评审领域= '全选'
  状态= '全选'
  状态列表= ['全选', '待审核', '可用', '失效']
  评审领域列表= ['全选', '幼儿园教育评估', '小学教育评估', '中学教育评估', '高职教育评估' , '高校教育评估']
  async componentWillMount() {
    const {data} = await axios.get('/information/getList')
    console.log(data)
    this.initData = data
    this.displayData = this.initData
    this.loading = false
  }
  handleChange评审领域= (value: string) => {
    this.评审领域 = value
  }
  handleChange状态= (value: string) => {
    this.状态 = value
  }
  filter= () => {
    this.displayData = this.initData.filter(value => 
      (value.评审领域 === this.评审领域 || this.评审领域 === '全选') && value.状态 === this.状态 || this.状态 === '全选')
  }
  render () {
    if (this.loading) return <div>loading</div>
    return (
      <div style={{maxWidth: '1024px'}}>
        <div className="flex-center">
          <div style={{margin: 8}}>
            <Select placeholder="请选择评审领域" style={{ width: 120 }} onChange={this.handleChange评审领域}>
              {this.评审领域列表.map((value, index) => (
                <Option value={value} key={index}>{value}</Option>
              ))}
            </Select>
          </div>
          <div style={{margin: 8}}>
          <Select placeholder="请选择状态" style={{ width: 120 }} onChange={this.handleChange状态}>
            {this.状态列表.map((value, index) => (
              <Option value={value} key={index}>{value}</Option>
            ))}
          </Select>
          </div>
          <div style={{margin: 8}}>
            <Button type="primary" onClick={this.filter}>查询</Button>
          </div>
        </div>
        <Table columns={this.columns} dataSource={this.displayData.slice()} rowKey={(row) => (row as any).id} />
      </div>
    ) 
  }
}