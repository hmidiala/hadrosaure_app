// Bring in all dependencies
require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bodayParser = require('body-parser');
const passport = require('passport');
// Test the name of our DB
//console.log(process.env.DATABASE);

//intializie app with express
const app = express();
const UserRoutes = require('./routes/users');
const TaskRoutes = require('./routes/tasks');


//Database Connection
mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true,
useNewUrlParser: true,});
mongoose.connection.on('connected', () => {
  console.log('Connected to the database');
});
mongoose.connection.on('error',  (err) => {
  console.log(`Unable to connect to the database: ${err}`);
});
//Port to be used by the server
const _PORT = process.env.PORT;


//---------------- Middlewares ----------------//
//CROS MW
app.use(cors());
//Body Parser MW
app.use(bodayParser.json());

//Passport MW
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
//---------------- Middlewares ----------------//

//Static public folder
app.use(express.static(path.join(__dirname, 'public')));

//Index Rotuer
app.get('/', (req, res, next) => {
  res.send('I am Dinosaure')
});

//Users Routes
 app.use('/users', UserRoutes);
 app.use('/tasks', TaskRoutes);

//Start the server
app.listen(_PORT, () => {
  console.log('Server Started');
});
