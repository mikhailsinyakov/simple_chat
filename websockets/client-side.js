"use strict";

export default function () {
    let ws;

    this.createConnection = (updateUsers, updateMessages, addMessage) => {
        ws = new WebSocket('ws://localhost:1234/', 'echo-protocol');
        ws.addEventListener('message', message => {
            message = JSON.parse(message.data);
            if (message.type == 'updateUsers') {
                updateUsers(message.usernames);
            }
            else if (message.type == 'existingMessages') {
                let messages = message.messages;
                messages = messages.map(message => {
                    const {user, time, value} = message;
                    return {user, time, value};
                })
                updateMessages(messages);
            }
            else {
                const {user, time, value} = message;
                message = {user, time, value};
                addMessage(message);
            }
        });
    };

    this.sendUserName = name => {
        ws.addEventListener('open', () => {
            const obj = {
                type: 'username',
                username: name
            };
            ws.send(JSON.stringify(obj));
        });
    };

    this.sendMessage = message => {
        if (ws.readyState == 1) {
            message = {
                type: 'newMessage',
                value: message
            };
            ws.send(JSON.stringify(message));
        }
    };

}