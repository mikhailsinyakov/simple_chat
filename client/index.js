"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import WebSocket from '../websockets/client-side';
import Greeting from './components/Greeting.js';
import Messages from './components/Messages.js';
import Typing from './components/Typing.js';

const app = document.querySelector('#app');
const ws = new WebSocket();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            users: [],
            messages: []
        };

        this.createWebSocketConnection = this.createWebSocketConnection.bind(this);
        this.sendUserName = this.sendUserName.bind(this);
        this.addUserToChat = this.addUserToChat.bind(this);
        this.updateUsers = this.updateUsers.bind(this);

    }

    createWebSocketConnection() {
        ws.createConnection(this.updateUsers);
    }

    updateUsers(users) {
        console.log(users)
        this.setState({users});
    }

    sendUserName(name) {
        ws.sendUserName(name);
    }

    addUserToChat(name) {
        this.setState({user: name});
        this.createWebSocketConnection();
        this.sendUserName(name);
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