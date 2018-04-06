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
        this.sendMessage = this.sendMessage.bind(this);
        this.updateMessages = this.updateMessages.bind(this);
        this.addMessage = this.addMessage.bind(this);

    }

    createWebSocketConnection() {
        ws.createConnection(this.updateUsers, this.updateMessages, this.addMessage);
    }

    updateUsers(users) {
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

    sendMessage(message) {
        ws.sendMessage(message);
    }

    updateMessages(messages) {
        this.setState({messages})
    }

    addMessage(message) {
        console.log(message + ' in addMessage')
        const messages = this.state.messages;
        messages.push(message);
        console.log(messages);
        this.setState({messages});
    }

    render() {
        if (!this.state.user) {
            return <Greeting addUserToChat={this.addUserToChat}/>
        }

        return (
            <div>
                <Messages user={this.state.user}/>
                <Typing sendMessage={this.sendMessage}/>
            </div>
        )
    }
}

ReactDOM.render(<App/>, app);