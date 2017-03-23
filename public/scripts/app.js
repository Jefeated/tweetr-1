/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

var tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];
$(function(){


function renderTweets(tweets) {
  // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for(i=0; i<tweetData.length; i++){
      $('#tweets-posted').append(createTweetElement(tweetData[i]));
    }
}

function createTweetElement(tweet) {
  var $tweet = $('<article>').addClass('tweet-post');

      $tweet.append(createHeader(tweet));
      $tweet.append(createBody(tweet));
      $tweet.append(createfooter(tweet));

  return $tweet;
}

function createHeader(data){
  // var $p = $("<p>");
  // $p.text("hello");
  var $header = $('<header>');
      $header.append($('<img class = "icon">').attr('src', data.user.avatars.small));
      $header.append($('<h2>').text(data.user.name));
      $header.append($('<p class="handler">').text(data.handle));
      
return $header;
}

function createBody(data){
  var $body = $('<main>');
      $body.append($('<p #tweettext>').text(data.content.text));
return $body;
}

function createfooter(data){
  var $footer = $('<footer></footer>');
      $footer.append($('<p class="created">').text(data.created_at));
return $footer;
}

// var $tweet = createTweetElement(tweetData[0]);

// var $section = $('#tweets-posted');
// $section.append($tweet);
renderTweets(tweetData);

});

