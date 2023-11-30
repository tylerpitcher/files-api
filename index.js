const route = require('./graphql/route');
const express = require('express');
require('dotenv').config();
require('./mongo/connect')();

const app = express();

app.use('/graphql', route);

app.listen(8080);
