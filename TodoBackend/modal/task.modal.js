const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    
  },
 date:{
    type:Date,
    default:Date.now()
 },
  userID:{
    type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the Vendor model
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
