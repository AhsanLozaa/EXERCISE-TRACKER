const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Help us to connec to the mongodb Database


require('dotenv').config();

// Creating the express server
const app = express();
const port = process.env.PORT || 5000;

// The middlewares
app.use(cors());    // cors middleware
app.use(express.json()); // This will allow us to parse json 

const uri = process.env.ATLAS_URI;
// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log("MongoDB database connection established successfully");
// })

mongoose.connect( uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
.then(() => console.log( 'MongoDB database connection established successfully' )).catch(err => console.log( err ));

// Requireing the files to use here
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

// We are using app.use to use these files
app.use('/exercises', exercisesRouter); // 'localhost://5000/exercises' => will load the exercisesRouter 
app.use('/users', usersRouter);         // 'localhost://5000/users' => will load the usersRouter





// Starts listening to a port 
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});