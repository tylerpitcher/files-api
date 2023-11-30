const mongoose = require('mongoose');

const schema = mongoose.Schema({
  parentId: mongoose.ObjectId,
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  }, 
});

module.exports = mongoose.model('File', schema);
