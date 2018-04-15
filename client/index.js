"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import WebSocket from '../websockets/client-side';
import Header from './components/Header';
import Greeting from './components/Greeting';
import Messages from './components/Messages';
import Typing from './components/Typing';
import Footer from './components/Footer'

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
        this.scrollMainElemToBottom = this.scrollMainElemToBottom.bind(this);

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
        this.setState({messages}, this.scrollMainElemToBottom);
    }

    addMessage(message) {
        const messages = this.state.messages;
        messages.push(message);
        this.setState({messages}, this.scrollMainElemToBottom);
    }

    scrollMainElemToBottom() {
        const mainElem = document.querySelector('main');
        mainElem.scrollTop = mainElem.scrollHeight - mainElem.clientHeight;
    }

    render() {
        
        const main = (
            <main>
                {
                    !this.state.user 
                        ? <Greeting addUserToChat={this.addUserToChat}/>
                        : (<div className="main-wrapper">
                            <Messages messages={this.state.messages} user={this.state.user}/>
                            <Typing sendMessage={this.sendMessage}/>
                          </div>)
                }
            </main>
        );

        return (
            <div className="container">
                <Header user={this.state.user} users={this.state.users} />
                {main}
                <Footer />
            </div>
        );
    }
}

ReactDOM.render(<App/>, app);