const Folder = require('../mongo/folderModel');
const File = require('../mongo/fileModel');
const { FileType } = require('./File');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = require('graphql');
const mongoose = require('mongoose');

const FolderType = new GraphQLObjectType({
  name: 'Folder',
  fields: () => ({
    id: { type: GraphQLID },
    parentId: { type: GraphQLID },
    name: { type: GraphQLString },
    folders: {
      type: GraphQLList(FolderType),
      resolve: async (parent, _) => {
        const folders = await Folder.find({ parentId: parent.id });
        return folders;
      },
    },
    files: {
      type: GraphQLList(FileType),
      resolve: async (parent, _) => {
        const files = await File.find({ parentId: parent.id });
        return files;
      },
    },
  }),
});

const folderQueries = {
  folder: {
    type: FolderType,
    args: { id: { type: GraphQLID } },
    resolve: async (_, args) => {
      const folder = await Folder.findById(args.id);
      return {
        id: folder._id,
        parentId: folder._doc.parentId,
        name: folder.name,
      };
    },
  },
  path: {
    type: GraphQLString,
    args: { id: { type: GraphQLID } },
    resolve: async (_, args) => {
      const [folder] = await Folder.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(args.id) }
        },
        {
          $graphLookup: {
            from: 'folders',
            startWith: '$parentId',
            connectFromField: 'parentId',
            connectToField: '_id',
            as: 'ancestors',
          }, 
        },
        {
          $sort: { 'ancestors.depth': 1 }
        }
      ]);
      
      const path = folder.ancestors.reduce((prev, curr) => `${prev}/${curr.name}`, '') + `/${folder.name}`;

      return path;
    },
  }
};

module.exports = {
  FolderType,
  folderQueries,
};
