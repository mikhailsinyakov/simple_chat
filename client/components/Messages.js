"use strict";

import React from 'react';
import Message from './Message';

export default function Messages (props) {

    const noMessage = <p className="text-center">Сообщений пока нет</p>;

    const messages = props.messages.map(message => {
        return <Message message={message}/>;
    });

    return (
        <div className="messages">
            {props.messages.length ? messages : noMessage}
        </div>
    );
}