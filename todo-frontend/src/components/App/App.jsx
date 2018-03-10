import React, { Component } from 'react'
import './App.css';
import axios from 'axios'
import Form from '../Form/Form.jsx'
import Todo from '../Todo/Todo.jsx'

class App extends Component {
  constructor() {
    super()
    this.state = {
      todos: []
    }
  }

  componentWillMount() {
    axios.get('http://localhost:8080/')
      .then(res => {
        this.setState({
          todos: res.data
        })
      })
  }


  textSubmit = (textInput) => {
    if (!textInput) {
      alert('You should enter a task')
    } else {
      axios.post('http://localhost:8080/', { description: textInput })
        .then((res)=>{
          this.setState({
            todos: res.data
          })
        })
    }
  }

  lineThrough = (id) => {
    let x = this.state.todos.filter((todo)=>{
      return todo.id === id
    })
    axios.put('http://localhost:8080/', {
      id: id,
      completed: !x[0].completed
    }).then()

    this.state.todos.forEach((todo) => {
      if (todo.id === id) todo.completed = !todo.completed
    })
    this.setState({
      todos: this.state.todos
    })
  }

  removeTodo = (id) => {
    axios.delete('http://localhost:8080/', {
      params: { id: id }
    }).then()

    let updatedTodos = this.state.todos.filter((item) => {
      return item.id !== id
    })
    this.setState({
      todos: updatedTodos
    })
  }

  clearComplete = () => {
    axios.delete('http://localhost:8080/delete-all',{
      params: {completed:true}
    }).then()
    let removedCompleted = this.state.todos.filter((todo) => {
      return todo.completed === false
    })
    this.setState({
      todos: removedCompleted
    })
  }

  render() {

    return (
      <div className="container text-center">
        <h1 className="title">Todo List</h1>
        <Form textSubmit={this.textSubmit} />
        <Todo todos={this.state.todos} lineThrough={this.lineThrough} removeTodo={this.removeTodo} clearComplete={this.clearComplete} />
      </div>
    );
  }
}

export default App
