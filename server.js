const express = require('express');
const HttpError = require('./models/http-error');
const bodyParser = require('body-parser');
const placesRoutes = require('./routes/places-routes')
const usersRoutes = require('./routes/users-routes');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json())

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
})

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

app.use((req,res,next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error; 
})

app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'});
  });

  mongoose
  .connect('mongodb+srv://roieRaz:682000@cluster0.jmhh8.mongodb.net/BeenThere?retryWrites=true&w=majority')
  .then(() => {
      console.log('Connected to MongoDB');
      app.listen(5000)
  })
  .catch((err) => {
      console.error('Failed to connect to MongoDB', err);
  });
  

