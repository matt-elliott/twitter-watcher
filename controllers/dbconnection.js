module.exports = function() {
  var mongoose = require('mongoose');
  var db = mongoose.connection;
 
  var connection = mongoose.connect('mongodb://' + process.env.DBUSER + ':' + process.env.DBPASS + '@ds257495.mlab.com:57495/airline-sales',  {useMongoClient: true});

  db.on('error', console.error.bind(console, 'connection error'))
 
  db.once('open', function() {
    console.log('connected to mongo succesfully');
  });
}