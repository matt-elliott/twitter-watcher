var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tweetSchema = new Schema({
  profileThumbnail: String,
  date: String,
  username: String,
  name: String,
  text: String,
  source: String,
  display: Boolean
});

tweetSchema.set('collection', 'tweets')

var TweetModel = mongoose.model('tweets', tweetSchema);

module.exports = TweetModel;