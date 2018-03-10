import React, { Component } from 'react';

class Form extends Component {
    constructor() {
        super()
        this.state = {
            text: ''
        }
    }

    textHandler = (event) => {
        let textInput = event.target.value
        this.setState({
            text: textInput
        })
    }

    enterKeyHandler = (event) => {
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={this.enterKeyHandler}>
                <input type="text" onKeyUp={(event) => { this.textHandler(event) }} ref={(self) => this.todoText = self}/>
                <button className="btn btn-warning" onClick={() => { 
                    this.props.textSubmit(this.state.text) 
                    this.todoText.value = ''
                }} type="submit">add</button>
                <br />
            </form>
        );
    }
}

export default Form