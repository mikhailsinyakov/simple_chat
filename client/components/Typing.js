"use strict";

import React from 'react';

export default class Typing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }

        this.handleInput = this.handleInput.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(e) {
        e.persist();
        this.setState({value: e.target.value});
    }

    handleKeyPress(e) {
        e.persist();
        if (e.key == "Enter") this.handleSubmit();
    }

    handleSubmit() {
        if (!this.state.value) return;
        this.props.sendMessage(this.state.value);
        this.setState({value: ''});
    }

    render() {
        return (
            <div className="text-center">
                <input type="text" value={this.state.value} autofocus="true"
                 onInput={this.handleInput} onKeyPress={this.handleKeyPress}/>
                <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>
                    Oтправить
                </button>
            </div>
        )
    }
}