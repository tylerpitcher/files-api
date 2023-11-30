const File = require('../mongo/fileModel');

const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');

const FileType = new GraphQLObjectType({
  name: 'File',
  fields: () => ({
    id: { type: GraphQLID },
    parentId: { type: GraphQLID },
    name: { type: GraphQLString },
    location: { type: GraphQLString },
  }),
});

const fileQueries = {
  file: {
    type: FileType,
    args: { id: { type: GraphQLID } },
    resolve: async (_, args) => {
      const file = await File.findById(args.id);
      return file;
    },
  },
};

module.exports = {
  FileType,
  fileQueries
};
