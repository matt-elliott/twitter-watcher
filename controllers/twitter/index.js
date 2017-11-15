var Slack = require('slack-node');
var db = require('../../controllers/dbconnection.js');
var TweetModel = require('../../schemas/tweet.js');
var Twitter = require('twitter');
var twitter = new Twitter({
  consumer_key: 'JrK8RTrV7oz2jhLP5GfKlbvMH',
  consumer_secret: 'RhSBbrXa3pAHjpUwYC77gPQDOiTF70wqIFKgYTFysqHMcqjrX7',
  access_token_key: '930505922215944192-pvfJldLgzr81hWDyyo2P2ERRLJecFNf',
  access_token_secret: 'LtYNDwCpHQFtsImUnGsI4Hj9SFzzwjKEnoFUVGn90uqpR'
});
var webhookUri = 'https://hooks.slack.com/services/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';
var slack = new Slack();
slack.setWebhook(webhookUri);


var twitterStream = twitter.stream('statuses/filter', {
    // list of airlines follow: '13192972,20626359,12101862,260907612,21964954,7212562,124476322,56377143,6449282,18332190,22536055'
    track: '#ProperDrivingEtiquette'
  });


twitterStream.on('data', function(tweet) {

  if( tweet.text.indexOf('@') !== 0 && tweet.text.indexOf('RT') !== 0 ) { 
    var capturedTweet = new TweetModel({
      profileThumbnail: tweet.user.profile_image_url,
      date: tweet.created_at,
      username: tweet.user.screen_name,
      name: tweet.user.name,
      text: tweet.text,
      source: tweet.source,
      display: true
    });

    capturedTweet.save( function(error) {
      if(error) throw error;

      slack.webhook({
        channel: '#tweets',
        username: 'twitbot',
        text: 'Saved Tweet' + tweet.text
      }, function(error, response) {
        console.log(response.status);
      });

    });
  }
});

twitterStream.on('error', function(error) {
  console.error(error);
})

module.exports = twitter;
