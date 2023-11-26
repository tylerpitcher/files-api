const File = require('./mongo/fileModel');
const schema = require('./graphql/File');

const { graphqlHTTP } = require('express-graphql');
const express = require('express');
require('dotenv').config();
require('./mongo/connect')();

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(8080);
