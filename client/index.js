"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import Greeting from './components/Greeting.js';
import Messages from './components/Messages.js';
import Typing from './components/Typing.js';

const app = document.querySelector('#app');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            messages: []
        };
        this.addUserToChat = this.addUserToChat.bind(this);
    }

    addUserToChat(name) {
        this.setState({user: name});
    }

    render() {
        if (!this.state.user) {
            return <Greeting addUserToChat={this.addUserToChat}/>
        }

        return (
            <div>
                <Messages user={this.state.user}/>
                <Typing/>
            </div>
        )
    }
}

ReactDOM.render(<App/>, app);