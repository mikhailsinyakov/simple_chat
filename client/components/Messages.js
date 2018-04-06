"use strict";

import React from 'react';
import Message from './Message';

export default function Messages (props) {
    const messages = props.messages.map(message => {
        return <Message message={message}/>;
    })
    return messages;
}