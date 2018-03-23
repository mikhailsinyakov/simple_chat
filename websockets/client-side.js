"use strict";

export default function () {
    let ws;

    this.createConnection = () => {
        ws = new WebSocket('ws://localhost:1234/', 'echo-protocol');
    };

    this.sendUserName = name => {
        ws.addEventListener('open', () => ws.send(name));
    };

}