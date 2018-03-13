"use strict";

import React from 'react';

export default class Greeting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(value) {
        this.setState({value});
    }

    handleSubmit() {
        this.props.addUserToChat(this.state.value);
    }

    render() {
        return (
            <div>
                <h2>Привет, незнакомец</h2>
                <label>
                    Напиши свое имя:
                    <input type="text" name="name" value={this.state.value} 
                        onInput={e => this.handleInput(e.target.value)} autofocus required/>
                    <button type="button" onClick={this.handleSubmit}>Войти в чат</button>
                </label>
            </div>
        );
    }
}