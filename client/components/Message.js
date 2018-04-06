"use strict";

import React from 'react';

export default function Message (props) {
    const message = props.message;
    return (
        <div>
            <p>{message.user}</p>
            <p>{message.value}</p>
            <p>{message.time}</p>
        </div>
    );
}