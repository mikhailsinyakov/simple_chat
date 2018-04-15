"use strict";

import React from 'react';
import Info from './Info';

export default function Header (props) {
    return (
        <div className="header-wrapper">
            <header className="text-center bg-primary">
                <h2>Просто чат</h2>
            </header>
            {props.user ? <Info users={props.users}/> : null}
        </div>
    );
}