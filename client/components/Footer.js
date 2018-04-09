"use strict";

import React from 'react';

export default function Footer (props) {
    return (
        <footer className="text-center bg-warning">
            <nav>
                <a href="https://github.com/mikhailsinyakov/simple_chat/">Github</a>
                <a href="https://webpack.js.org/">Webpack</a>
                <a href="https://reactjs.org/">React</a>
                <a href="https://getbootstrap.com/">Bootstrap</a>
            </nav>
        </footer>
    );
}