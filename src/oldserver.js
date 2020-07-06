// require('rootpath')();
// const express = require('express');
// const app = express();
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const jwt = require('_helpers/jwt');
// const errorHandler = require('_helpers/error-handler');

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(cors());

// // use JWT auth to secure the api
// app.use(jwt());

// // api routes
// app.use('/users', require('./users/users.controller'));

// // global error handler
// app.use(errorHandler);

// // start server
// const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
// const server = app.listen(port, function () {
//     console.log('Server listening on port ' + port);
// });

const MongoClient = require( 'mongodb' ).MongoClient;
const url = "mongodb://localhost:27017";
console.log('made it past require');
var _db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( url,  { useNewUrlParser: true }, function( err, client ) {
      _db  = client.db('test');
      if(err){
        console.log('works');
      }else{
        console.log('does not work');
      }
      //return callback( err );
    } );
  },

  getDb: function() {
    console.log('made inside getDb');
    return _db;
  }
};