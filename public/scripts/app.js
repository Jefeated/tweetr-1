/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function(){

loadtweets();

function loadtweets(){
  $.ajax({
    method: 'GET',
    url: '/tweets',
    success: (tweets) => renderTweets(tweets) 
  }); 
};

$('#submit-form').on('submit', function (event) {
    event.preventDefault(); 
    $.ajax({
      url:'/tweets',
      method: 'POST',
      data: $("textarea").serialize()
    }).done(function(tweets) {
      
    });
});

function validateForm() {
  var x = document.forms["submit-form"]["text"].value;
  if (x == "") {
      alert("Can not submit an empty form");
      return false;
  }
  else if ( x < 0 ) {
      alert ("Exceed charater limit");
      return false;
  }       
}

function renderTweets(tweets) {
  // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for(i=0; i<tweets.length; i++){
      $('#tweets-posted').append(createTweetElement(tweets[i]));
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

});

