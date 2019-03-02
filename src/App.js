import React, { Component } from 'react'
import './App.css'
import logo from './logo.svg'
import Todo from './Todo'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      busy: false,
      todos: []
    }
  }
  onClickGetTodos = () => {
    this.setState({ busy: true })
    fetch(`http://localhost:4000/api/v2/todos/`)
      .then(response => response.json())
      .then(todos => this.setState({ todos: todos, busy: false }))
  }
  onToggleCompleteTodo = (todo, onToggleCompleteTodoSuccess) => {
    fetch(`http://localhost:4000/api/v2/todos/${todo.id}`, { method: 'patch', body: JSON.stringify(todo) })
      .then(response => response.json())
      .then(todo => this.setState((state) => ({
        todos: state.todos.map(t => (t.id === todo.id) ? ({ ...t, completed: todo.completed }) : t)
      }), onToggleCompleteTodoSuccess))
  }
  render() {
    const { onClickGetTodos, onToggleCompleteTodo } = this;
    const { todos, busy } = this.state;
    return (
      <div className="app-container">

        {/* title */}
        <div>
          todos
        </div>

        {/* acquire click */}
        <div>
          <div onClick={onClickGetTodos}>
            <div>get async todos</div>
          </div>
        </div>

        {/* busy */}
        { busy && <div className={`busy-container`}>
          <img className={`busy`} src={logo} alt={`logo`} />
        </div> }

        {/* todos list */}
        { !busy && <div className={`todos-list-container`}>
          { !todos.length && <Todo dummy={true} todo={{ title: 'Add todos...', completed: false }} />}
          { todos.length > 0 && todos.map((todo, index) => <Todo key={index} todo={todo} onToggleCompleteRequest={onToggleCompleteTodo} />) }
        </div> }

      </div>
    )
  }
}

export default App
