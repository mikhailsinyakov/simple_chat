"use strict";

import React from 'react';

export default function Message (props) {
    const message = props.message;
    const messageClass = message.user == props.user ? "message bg-warning"
                                                    : "message bg-secondary";
    return (
        <div className="message-wrapper">
            <div className={messageClass}>
                <p className="message-value">{message.value}</p>
                <p className="message-data">
                    <span className="message-user">{message.user}</span>
                    <span className="message-time">{message.time}</span>
                </p>
            </div>
        </div>
    );
}