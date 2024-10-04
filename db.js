const mongoose = require('mongoose');

// Replace with your MongoDB URI
const mongoDBURI = 'mongodb://username:password@host:port/databaseName';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoDBURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
};

module.exports = connectToDatabase;
