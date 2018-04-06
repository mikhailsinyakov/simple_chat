"use strict";

import React from 'react';

export default function Info (props) {
    const users = props.users.map((user, i) => {
        return <span>{i == 0 ? ' ' : ', '}{user}</span>
    });

    return (
        <p>
            Пользователи, находящиеся на сайте: {users}
        </p>
    );
}