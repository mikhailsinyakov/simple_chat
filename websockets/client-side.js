"use strict";

export default function () {
    let ws;

    this.createConnection = updateUsers => {
        ws = new WebSocket('ws://localhost:1234/', 'echo-protocol');
        ws.addEventListener('message', message => {
            message = JSON.parse(message.data);
            if (message.type == 'username') {
                updateUsers(message.names);
            }
            else {

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

}