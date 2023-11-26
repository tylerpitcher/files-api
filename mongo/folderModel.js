const mongoose = require('mongoose');

const schema = mongoose.Schema({
  parent: mongoose.ObjectId,
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Folder', schema);
