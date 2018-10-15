// import cx from 'classnames';
import React, { Component } from 'react';

export default class TodoList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: '',
            listItems: [],
            itemsCompleted: 0
        }
    }
    handleInput = e => {
        this.setState({
            input: e.target.value
        })
    }
    handleAdd = e => {
        e.preventDefault()
        let newTodo = {
            text: this.state.input,
            id: Date.now(),
            completed: false
        }
        this.setState({
            listItems: [...this.state.listItems, newTodo],
            input: ''
        })
    }
    handleClick = itemId => {
        let todoItems = this.state.listItems.map(item => {
            if (item.id === itemId) {
                item.selected = (!item.selected)
                if (item.selected === true) {
                    this.setState({
                        itemsCompleted: this.state.itemsCompleted + 1
                    }) 
                } else {
                    this.setState({
                        itemsCompleted: this.state.itemsCompleted - 1
                    })
                }
            }
            return item
        })
        this.setState({ listItems: todoItems})
    }
    // componentDidUpdate = () => {
    //     console.log(this.state)
    // }
    render() {
        return (
            <>
                <div>
                    <style>{`
                        .is-done {
                            text-decoration: line-through;
                        }
                    `}</style>
                    <h2>
                        Todo List
                    </h2>
                    <form>
                        <input 
                            type='text' 
                            value={this.state.input}
                            onChange={e => this.handleInput(e)}
                        />
                        <button 
                            type='submit'
                            onClick={e => this.handleAdd(e)}
                        >
                            Add
                        </button>
                    </form>
                    <p>{this.state.listItems.length - this.state.itemsCompleted} remaining out of {this.state.listItems.length} tasks</p>
                    <TodoItems 
                        items={this.state.listItems} 
                        handleClick={this.handleClick}
                    />
                </div>
            </>
        );
    }
}

const TodoItems = props => {
    let todoItems = []
    for (let todo of props.items) {
        todoItems.push(
            <TodoItem 
                item={todo} 
                handleClick={props.handleClick}
            />
        )
    }
    return <ul>{todoItems}</ul>        
}

const TodoItem = props => {
    let classToApply = props.item.selected ? 'is-done' : ''
    return (
        <li
            key={props.item.id} 
            className={classToApply}
            onClick={() => props.handleClick(props.item.id)}
        >
            {props.item.text}
        </li>  
    )
}

