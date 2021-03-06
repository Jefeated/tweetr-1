function timeSince(date) {
 if (typeof date !== 'object') {
   date = new Date(date);
 }

 var seconds = Math.floor((new Date() - date) / 1000);
 var intervalType;

 var interval = Math.floor(seconds / 31536000);
 if (interval >= 1) {
   intervalType = 'year';
 } else {
   interval = Math.floor(seconds / 2592000);
   if (interval >= 1) {
     intervalType = 'month';
   } else {
     interval = Math.floor(seconds / 86400);
     if (interval >= 1) {
       intervalType = 'day';
     } else {
       interval = Math.floor(seconds / 3600);
       if (interval >= 1) {
         intervalType = "hour";
       } else {
         interval = Math.floor(seconds / 60);
         if (interval >= 1) {
           intervalType = "minute";
         } else {
           interval = seconds;
           intervalType = "second";
         }
       }
     }
   }
 }

 if (interval > 1 || interval === 0) {
   intervalType += 's';
 }

 return interval + ' ' + intervalType;
};

$(function(){


function loadtweets(){
  $.ajax({
    method: 'GET',
    url: '/tweets',
    success: (tweets) => renderTweets(tweets) 
  }); 
};

$('#submit-form').on('submit', function (event) {
    event.preventDefault();
    var text = $('#submit-form textarea');

    if(validateForm(text)) {
      $.ajax({
        method: 'POST',
        url:'/tweets',
        data: text.serialize(),
        success: function(){
          alert('submitted');
          loadtweets();
          text.val('');
          $('.counter').text(140)
        }   
      });
    }
});

function validateForm(text) {
  if ($.trim(text.val().length === 0)) {
    alert("Can not submit an empty form");
    return false;
  }
  else if (text.val().length > 140 ) {
    alert ("Exceeded charater limit");
    return false;
  }
  else {
    return true;
  }       
}

function renderTweets(tweets) {
  // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for(i=0; i<tweets.length; i++){
      $('#tweets-posted').prepend(createTweetElement(tweets[i]));
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
  var $header = $('<header class ="tweet-header">');
      $header.append($('<img class = "icon">').attr('src', data.user.avatars.small));
      $header.append($('<h2>').text(data.user.name));
      $header.append($('<p class="handler">').text(data.user.handle));
      
return $header;
}

function createBody(data){
  var $body = $('<main>');
      $body.append($('<p id=tweettext>').text(data.content.text));
return $body;
}

function createfooter(data){
  var $footer = $('<footer>');
      $footer.append($('<p class=created>').text(timeSince(data.created_at)));
return $footer;
}

loadtweets();

});