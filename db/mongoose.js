/* This module will hold our connection to 
   our mongo server through the Mongoose API.
   We will access the connection in our express server. */
   const mongoose = require('mongoose')

   /* Connnect to our database */
   // Get the URI of the local database, or the one specified on deployment.
   const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://bert:bertbertbert@cluster0.hgiw4.mongodb.net/<dbname>?retryWrites=true&w=majority'//'mongodb://localhost:27017/AchievementHubAPI'
   
   mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
   
   module.exports = { mongoose }  // Export the active connection.