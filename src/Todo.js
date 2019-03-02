import React, { Component } from 'react'
import logo from './logo.svg'

class Todo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      busy: false
    }
  }
  onToggleCompleteSuccess = () => {
    this.setState({ busy: false })
  }
  onClickCompleted = () => {
    const { onToggleCompleteSuccess } = this
    const { onToggleCompleteRequest, todo } = this.props
    this.setState({ busy: true })
    onToggleCompleteRequest({ ...todo, completed: !todo.completed }, onToggleCompleteSuccess)
  }
  render () {
    const { onClickCompleted } = this
    const { busy } = this.state
    const { todo, dummy } = this.props
    return (
      <div className={`todo-container`}>
        <div>
          { todo.title }
        </div>
        <div>
          { busy && <img className={`busy`} src={logo} alt={`logo`} />}
          { !busy && <input type={`checkbox`} value={todo.completed} onClick={onClickCompleted} disabled={dummy} />}
        </div>
      </div>
    )
  }
}

export default Todo