const express = require('express');
const connectToMongoDB = require('./config/mongo.connect');
const User = require('./modal/user.modal');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { ObjectId } = require('mongodb');

const cors = require('cors');
const authenticateUser = require('./middleware/UserAuthenticate');
const Task = require('./modal/task.modal');
const app = express()
app.use(express.json())
app.use(cors())
app.get('/',(req,res)=>{
    res.send('hii')
})
app.listen('8080',()=>{
    console.log(`runninig on port 8080`);
    connectToMongoDB()
})
 


app.post('/signup', async (req, res) => {
    const{name,fatherName,email,mobile,password} = req.body
    try {
      // Check if the user with the provided email already exists
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists.' });
      }
  
      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({
        name,fatherName,email,mobile,
        password: hashedPassword,
      });
  console.log(newUser);
      // Save the user to the database
      await newUser.save();
  
      
      res.status(201).json({ msg:`user registerd succesfully` });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  });

  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  console.log(email,password);
    try {
      // Check if the user with the provided email exists
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }
  
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }
  
      // Generate a JWT token for authentication
      const token = jwt.sign({ userId: user._id }, 'CHIRAG57', { expiresIn: '20d' });
  
      // Return the token to the client
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  });


   app.post('/create-task',authenticateUser,async(req,res)=>{
    const {content} = req.body
    const userId = req.user.userId
    console.log(content);
    try {
        const newNote = new Task({
            content:content,userID:userId
        })
        await newNote.save()
        res.send({msg:"created task"})
    } catch (error) {
        console.log(error);
        res.status(401).send({msg:"something went wrong"})
    }
   })


   app.get('/fetch-tasks', authenticateUser, async (req, res) => {
    const userId = req.user.userId;
    const itemsPerPage = 3; // Number of tasks to fetch per page
    const page = parseInt(req.query.page) || 1; // Get the page number from the request query, default to page 1
  
    try {
      const skipCount = (page - 1) * itemsPerPage; // Calculate the number of tasks to skip
      const tasks = await Task.find({ userID: userId })
        .skip(skipCount)
        .limit(itemsPerPage);
      // Check if there are more tasks available on the next page
      const totalCount = await Task.countDocuments({ userID: userId });
      const hasMore = (page * itemsPerPage) < totalCount;
  
      res.send({ tasks, hasMore,totalCount });
    } catch (error) {
      res.status(401).send({ msg: "Something went wrong" });
    }
  });

  app.get('/fetch-tasks-id/:id', async (req, res) => {
    const {id} = req.params
    try {
      const findTask = await Task.findById(id)
      console.log(findTask);
      res.send(findTask)
    } catch (error) {
      res.send({msg:"something wend wrong"})
    }
  });
  


  app.post('/update-task/:taskid',authenticateUser,async(req,res)=>{
    const userId = req.user.userId
    const  taskid = req.params.taskid
    const {content} = req.body
    const findTask = await Task.findById(taskid)
    console.log(content,userId,taskid);
    if(!findTask){
        res.status(401).send({msg:"no task"})
    }
    const objectId = new ObjectId(userId);
    if(!findTask.userID.equals(objectId)){
      console.log(findTask.userID,objectId);
        return res.status(401).send({msg:"not authorize"})
    }
    try {
      const update = await Task.findByIdAndUpdate(taskid, { content });
        
        res.send({msg:"updated"})
    } catch (error) {
        res.status(401).send({msg:"something went wrong"})
    }
  })
  app.delete('/delete-task/:taskid',authenticateUser,async(req,res)=>{
    const userId = req.user.userId
    const  taskid = req.params.taskid
    
    const findTask = await Task.findById(taskid)
    if(!findTask){
        res.status(401).send({msg:"no task"})
    }
    const objectId = new ObjectId(userId);
    if(!findTask.userID.equals(objectId)){
      console.log(findTask.userID,objectId);
        return res.status(401).send({msg:"not authorize"})
    }
    try {
        const update = await Task.findByIdAndDelete(taskid)
        res.send({msg:"deleted"})
    } catch (error) {
        res.status(401).send({msg:"something went wrong"})
    }
  })
