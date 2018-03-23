"use strict";

const http = require('http');
const server = http.createServer((req, res) => {});
const WebSocketServer = require('websocket').server;

server.listen(1234, () => 'Server is listening..');


module.exports = app => {

    const wsServer = new WebSocketServer({
        httpServer: server
    });

    let clients = {};
    let countClients = 0;
    const messages = [];

    wsServer.on('request', r => {
        const connection = r.accept('echo-protocol', r.origin);

        const id = countClients++;
        clients[id] = {connection};
        
        connection.on('message', message => {
            message = JSON.parse(message.utf8Data);

            if (message.type == 'username') {
                clients[id].name = message.username;
                let clientNames = {
                    type: 'username',
                    names: []
                };

                for (let key in clients) {
                    clientNames.names.push(clients[key].name);
                }

                for (let key in clients) {
                    const clientsStr = JSON.stringify(clientNames);
                    clients[key].connection.send(clientsStr);
                }
            }

            else {
                for (let key in clients) {
                    const messageStr = JSON.stringify(message);
                    clients[key].connection.send(messageStr);
                }
            }
            
        });

        connection.on('close', () => {
            delete clients[id];
            countClients--;
        })

    });


};