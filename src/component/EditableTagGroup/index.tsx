import * as React from 'react'
import { Tag, Input, Tooltip, Button } from 'antd'
interface EditableTagGroupState {
  tags: string[],
  inputVisible: boolean,
  inputValue: string
}
class EditableTagGroup extends React.Component<{
  maxNumber: number, placeholder: string, disabled: boolean, defaultValue: string[]
}, EditableTagGroupState> {
  input: HTMLInputElement
  constructor(props: any) {
    super(props)
    this.state = {
      tags: [],
      inputVisible: false,
      inputValue: '',
    }
  }
  handleClose = (removedTag: string) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag)
    console.log(tags)
    this.setState({ tags })
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus())
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value })
  }

  handleInputConfirm = () => {
    const state = this.state
    const inputValue = state.inputValue
    let tags = state.tags
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue]
    }
    console.log(tags)
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    })
  }

  saveInputRef = input => this.input = input

  render() {
    const { tags, inputVisible, inputValue } = this.state
    return (
      <div>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20
          const tagElem = (
            <Tag key={tag} closable={!this.props.disabled} afterClose={() => this.handleClose(tag)}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          )
          return isLongTag ? <Tooltip title={tag}>{tagElem}</Tooltip> : tagElem
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="large"
            style={{ width: 108 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {
          !this.props.disabled 
          && this.state.tags.length < this.props.maxNumber
          && !inputVisible
          && <Button size="large" type="dashed" onClick={this.showInput}>添加{this.props.placeholder}</Button>
        }
      </div>
    )
  }
}

export default EditableTagGroup