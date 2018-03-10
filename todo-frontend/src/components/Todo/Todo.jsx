import React from 'react'
import './Todo.css'

function Todo(props) {
    let userList = props.todos.map((item) => {
        return (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id} >
                <label className="checkbox-container">
                    <input 
                    type="checkbox" 
                    defaultChecked={item.completed} 
                    onClick={() => { props.lineThrough(item.id) }}
                    />
                    <span className="checkmark"></span>
                </label>
                <span className={(item.completed) ? "done-style" : "undone-style"}>
                    {item.description}
                </span>
                <button 
                className="btn btn-danger" 
                onClick={() => { props.removeTodo(item.id) }}
                >
                X
                </button>
            </li>
        )
    })

    return (
        <div>
            <ul className="list-group" >
                {userList}
            </ul>
            <button 
            className="btn btn-success" 
            type="button" 
            onClick={props.clearComplete}
            >
            Clear Completed Tasks
            </button>
        </div>
    )
}

export default Todo