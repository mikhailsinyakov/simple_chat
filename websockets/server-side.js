"use strict";




module.exports = app => {
    const http = require('http');
    const server = http.createServer(app);
    const WebSocketServer = require('websocket').server;
    const port = process.env.PORT;

    server.listen(port, () => 'Server is listening..');
    const wsServer = new WebSocketServer({
        httpServer: server
    });

    let users = [];
    let count = 0;
    let messages = [];

    wsServer.on('request', req => {
        const connection = req.accept('echo-protocol', req.origin);

        const id = count++;
        users[id] = {connection};
        
        connection.on('message', message => {
            message = JSON.parse(message.utf8Data);

            if (message.type == 'username') {
                users[id].name = message.username;
                sendUsersListToClients();
                if (messages.length) sendUserExistingMessages(users[id]);
            }

            else {
                sendUsersNewMessage(users[id], message);
            }
            
        });

        connection.on('close', () => {
            users[id] = null;
            if (filterActiveUsers(users).length) sendUsersListToClients();
            else {
                users.length = 0;
                messages.length = 0;
                count = 0;
            }
        });


    });

    function filterActiveUsers(users) {
        return users.filter(user => user);
    }

    function objToStr(obj) {
        return JSON.stringify(obj);
    }

    function sendUsersListToClients() {
        const usernames = filterActiveUsers(users).map(user => user.name);
        const message = {
            type: 'updateUsers',
            usernames
        };
        filterActiveUsers(users).forEach(user => user.connection.send(objToStr(message)));
    }

    function sendUsersNewMessage(user, message) {
        const newMessage = {
            type: 'newMessage',
            user: user.name,
            value: message.value,
            time: new Date().valueOf()
        }
        messages.push(newMessage);

        filterActiveUsers(users).forEach(user => user.connection.send(objToStr(newMessage)));
    }

    function sendUserExistingMessages(user) {
        const message = {
            type: 'existingMessages',
            messages
        };
        user.connection.send(objToStr(message));
    }

};