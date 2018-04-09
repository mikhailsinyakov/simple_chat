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
                messages = messages.map(message => changeMessage(message));
                updateMessages(messages);
            }
            else {
                message = changeMessage(message);
                addMessage(message);
            }

            function changeMessage(message) {
                let {user, time, value} = message;
                time = new Date(time);
                let hours = time.getHours() < 10 ? '0' + time.getHours() : time.getHours().toString();
                let minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes().toString();
                let seconds = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds().toString();
                time = `${hours}:${minutes}:${seconds}`;
                return {user, time, value};
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