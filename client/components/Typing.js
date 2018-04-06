"use strict";

import React from 'react';

export default class Typing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(e) {
        e.persist();
        this.setState({value: e.target.value});
    }

    handleSubmit() {
        this.props.sendMessage(this.state.value);
        this.setState({value: ''});
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.value} onInput={this.handleInput}/>
                <button type="button" onClick={this.handleSubmit}>Oтправить</button>
            </div>
        )
    }
}