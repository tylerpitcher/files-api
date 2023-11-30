const { folderQueries } = require('./Folder');
const { fileQueries } = require('./File');

const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...fileQueries,
    ...folderQueries,
  },
});

const schema = new GraphQLSchema({
  query,
});

module.exports = graphqlHTTP({
  schema,
  graphiql: true,
})
