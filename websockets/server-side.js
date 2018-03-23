"use strict";

const http = require('http');
const WebSocketServer = require('websocket').server;

const server = http.createServer((req, res) => {});

server.listen(1234, () => 'Server is listening..');


module.exports = app => {

    const wsServer = new WebSocketServer({
        httpServer: server
    });

    wsServer.on('request', r => {
        const connection = r.accept('echo-protocol', r.origin);
        connection.on('message', message => console.log(message.utf8Data));
    });


};