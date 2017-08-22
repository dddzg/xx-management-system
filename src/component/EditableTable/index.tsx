import * as React from 'react'
import { observer } from 'mobx-react'
// import { observable } from 'mobx'
import { Table, Input } from 'antd'
interface IEditableTableProps <T>{
  data: T[],
  colums: string[],
  disabled?: boolean
}

@observer
class EditableTable<T> extends React.Component<IEditableTableProps<T>> {
  static defaultProProps= {
    disabled: false
  }
  columns: any[]= []
  constructor (props: any) {
    super(props)
    this.columns = this.props.colums.map(value => ({
      title: value,
      dataIndex: value,
      render: (text, record, index) => (
        <Input 
          disabled={this.props.disabled}
          defaultValue={record[value]} 
          onChange={event => {
            record[value] = (event.target as any).value
          }}
        />
      )
    }))
    this.columns.push({
      title: '操作',
      dataIndex: '操作',
      render: (text, record, index) => {
        return (
          <div 
            onClick={() => {
              // tslint:disable-next-line:no-unused-expression
              !this.props.disabled && this.props.data.splice(index, 1)
            }}
          >
            <a>删除</a>
          </div>
        )
      }
    })
  }
  render () {
    return (
      <div>
        {
          // mobx array需要slice一下
        }
        <Table dataSource={this.props.data.slice()} columns={this.columns}/> 
      </div>
    )
  }
}

export default EditableTable