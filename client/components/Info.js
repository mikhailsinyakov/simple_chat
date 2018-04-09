"use strict";

import React from 'react';

export default function Info (props) {
    const users = props.users.map((user, i) => {
        return <span>{i == 0 ? ' ' : ', '}{user}</span>
    });

    return (
        <div className="info bg-info">
            <h5 className="text-center">На сайте:</h5>
            <p>{users}</p>
        </div>
    );
}