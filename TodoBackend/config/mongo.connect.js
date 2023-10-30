const mongoose = require('mongoose');

// Replace 'your-database-uri' with your MongoDB connection URI
const mongoURI = 'mongodb+srv://chirag24:D696jNNuiQqMHBM2@chiragajmera.rht24ui.mongodb.net/';

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB via Mongoose');
    return mongoose.connection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

module.exports = connectToMongoDB;
