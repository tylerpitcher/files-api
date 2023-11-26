const File = require('../mongo/fileModel');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull, GraphQLSchema } = require('graphql');

const FileType = new GraphQLObjectType({
  name: 'File',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    location: { type: GraphQLString },
  }),
});

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    file: {
      type: FileType,
      args: { name: { type: GraphQLString } },
      resolve: async (_, args) => {
        const file = await File.findOne({ name: args.name });
        return { id: file._id, name: file.name, location: file.location };
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query,
});
