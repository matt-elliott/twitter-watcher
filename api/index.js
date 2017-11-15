var db = require('../controllers/dbconnection.js');
var connection = db.connection;
var bodyParser = require('body-parser');
var TweetModel = require('../schemas/tweet.js');

db();

module.exports = function (app, db) {
  app.use(bodyParser.json());
  app.use( bodyParser.urlencoded({extended: false}) );

  app.get('/', function(req,res) {
    res.render('../templates/index.ejs');
  });

  app.get('/api/getTweets', function(req,res) {

     // console.log(TweetModel);
     TweetModel.find( function(error, tweets) {
        if(error) console.log(error);

        // cleanTweets = tweets;
        
        res.send(tweets);
      });

  });
}