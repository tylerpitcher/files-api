const mongoose = require('mongoose');

const connect = async () => {
  try {
    const connection = mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected.');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connect;
