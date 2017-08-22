import * as React from 'react'
import { Tabs } from 'antd'
const TabPane = Tabs.TabPane
interface MultiTabProps {
  config: Map<string, any>
}
interface MultiTabState {
  activeKey: string,
  panes: {title: string, content: any, key: string}[]
}
class MultiTab extends React.Component<MultiTabProps, MultiTabState> {
  constructor(props: MultiTabProps) {
      super(props)
      const panes = [
        {title: '首页', content: this.props.config.get('首页'), key: '首页'}
      ]
      this.state = {
        activeKey: '首页',
        panes,
      }
    }

  onChange = (activeKey: string) => {
    this.setState({ activeKey })
  }
  onEdit = (targetKey, action) => {
    this[action](targetKey)
  }
  addItem = (item: {title: string, content: JSX.Element, key: string}) => {
    const panes = this.state.panes
    // tslint:disable-next-line:curly
    if (panes.some(value => value.key === item.key)) {
      this.onChange(item.key)
      return
    }
    panes.push(item)
    this.setState({ panes, activeKey: item.key })
  }
  add = (targetKey: string) => {
    const panes = this.state.panes
    // tslint:disable-next-line:curly
    if (panes.some(value => value.key === targetKey)) {
      this.onChange(targetKey)
      return
    }
    panes.push({ title: targetKey, content: this.props.config.get(targetKey), key: targetKey })
    this.setState({ panes, activeKey: targetKey })
  }
  remove = (targetKey: string) => {
    let activeKey = this.state.activeKey
    let lastIndex = 0
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1
      }
    })
    const panes = this.state.panes.filter(pane => pane.key !== targetKey)
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key
    }
    this.setState({ panes, activeKey })
  }
  render() {
    return (
      <div>
        <Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type="editable-card"
          onEdit={this.onEdit}
        >
          {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>)}
        </Tabs>
      </div>
    )
  }
}
export default MultiTab