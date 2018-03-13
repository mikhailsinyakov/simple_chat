"use strict";

import React from 'react';

export default class Messages extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <h2>Привет, {this.props.user}</h2>
        );
    }
}