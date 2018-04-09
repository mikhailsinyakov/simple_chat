"use strict";

import React from 'react';

export default class Greeting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(value) {
        value = value.length ? value[0].toUpperCase() + value.slice(1) 
                             : value;
        this.setState({value});
    }

    handleKeyPress(e) {
        e.persist();
        if (e.key == "Enter") this.handleSubmit();
    }

    handleSubmit() {
        this.props.addUserToChat(this.state.value);
    }

    render() {
        return (
            <div className="greeting text-center">
                <p>Для того, чтобы войти в чат, напиши свое имя: </p>
                <input type="text" name="name" value={this.state.value} 
                    placeholder="Имя или ник" autofocus="true" required
                    onInput={e => this.handleInput(e.target.value)}
                    onKeyPress={this.handleKeyPress}/>
                <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Войти</button>
            </div>
        );
    }
}