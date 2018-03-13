"use strict";
const routes = require('./app/routes/index');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
routes(app);

const port = process.env.PORT;
app.listen(port, () => console.log(`App is running on port ${port}...`));
