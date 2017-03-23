[33mcommit f85cd929cb80037eb484a6ac95a111b5265f3ebb[m
Author: Jefeated <jeffng@live.ca>
Date:   Thu Mar 23 21:22:30 2017 +0000

    added people into DB

[1mdiff --git a/public/index.html b/public/index.html[m
[1mindex 52d21b4..5435652 100644[m
[1m--- a/public/index.html[m
[1m+++ b/public/index.html[m
[36m@@ -26,6 +26,20 @@[m
     <script type="text/javascript" src="/scripts/app.js"></script>[m
 [m
     <script type="text/javascript" src="/scripts/composer-char-counter.js"></script>[m
[32m+[m[41m  [m
[32m+[m[32m  <script> function validateForm() {[m
[32m+[m[32m  var x = document.forms["submit-form"]["text"].value;[m
[32m+[m[32m  if (x === "") {[m
[32m+[m[32m      alert("Can not submit an empty form");[m
[32m+[m[32m      return false;[m
[32m+[m[32m  }[m
[32m+[m[32m  else if ( x < 0 ) {[m
[32m+[m[32m      alert ("Exceed charater limit");[m
[32m+[m[32m      return false;[m
[32m+[m[32m  }[m[41m       [m
[32m+[m[32m}[m
[32m+[m[32m</script>[m
[32m+[m
   </head>[m
 [m
   <body>[m
[36m@@ -45,7 +59,7 @@[m
         <section class="new-tweet">[m
           <h2>Compose Tweet</h2>[m
 [m
[31m-          <form action="/tweets" method='POST'>[m
[32m+[m[32m          <form action="/tweets" method='POST' id="submit-form" onsubmit="return validateForm()">[m
             <textarea name="text" placeholder="What are you humming about?"></textarea>[m
             <input type="submit" value="Tweet">[m
             <span class="counter">140</span>[m
[1mdiff --git a/public/scripts/app.js b/public/scripts/app.js[m
[1mindex 5d05267..3f486fe 100644[m
[1m--- a/public/scripts/app.js[m
[1m+++ b/public/scripts/app.js[m
[36m@@ -4,61 +4,50 @@[m
  * Reminder: Use (and do all your DOM work in) jQuery's document ready function[m
  */[m
 [m
[31m-var tweetData = [[m
[31m-  {[m
[31m-    "user": {[m
[31m-      "name": "Newton",[m
[31m-      "avatars": {[m
[31m-        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",[m
[31m-        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",[m
[31m-        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"[m
[31m-      },[m
[31m-      "handle": "@SirIsaac"[m
[31m-    },[m
[31m-    "content": {[m
[31m-      "text": "If I have seen further it is by standing on the shoulders of giants"[m
[31m-    },[m
[31m-    "created_at": 1461116232227[m
[31m-  },[m
[31m-  {[m
[31m-    "user": {[m
[31m-      "name": "Descartes",[m
[31m-      "avatars": {[m
[31m-        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",[m
[31m-        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",[m
[31m-        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"[m
[31m-      },[m
[31m-      "handle": "@rd" },[m
[31m-    "content": {[m
[31m-      "text": "Je pense , donc je suis"[m
[31m-    },[m
[31m-    "created_at": 1461113959088[m
[31m-  },[m
[31m-  {[m
[31m-    "user": {[m
[31m-      "name": "Johann von Goethe",[m
[31m-      "avatars": {[m
[31m-        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",[m
[31m-        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",[m
[31m-        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"[m
[31m-      },[m
[31m-      "handle": "@johann49"[m
[31m-    },[m
[31m-    "content": {[m
[31m-      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."[m
[31m-    },[m
[31m-    "created_at": 1461113796368[m
[31m-  }[m
[31m-];[m
[32m+[m
[32m+[m
[32m+[m
 $(function(){[m
 [m
[32m+[m[32mloadtweets();[m
[32m+[m
[32m+[m[32mfunction loadtweets(){[m
[32m+[m[32m  $.ajax({[m
[32m+[m[32m    method: 'GET',[m
[32m+[m[32m    url: '/tweets',[m
[32m+[m[32m    success: (tweets) => renderTweets(tweets)[m[41m [m
[32m+[m[32m  });[m[41m [m
[32m+[m[32m};[m
[32m+[m
[32m+[m[32m$('#submit-form').on('submit', function (event) {[m
[32m+[m[32m    event.preventDefault();[m[41m [m
[32m+[m[32m    $.ajax({[m
[32m+[m[32m      url:'/tweets',[m
[32m+[m[32m      method: 'POST',[m
[32m+[m[32m      data: $("textarea").serialize()[m
[32m+[m[32m    }).done(function(tweets) {[m
[32m+[m[41m      [m
[32m+[m[32m    });[m
[32m+[m[32m});[m
[32m+[m
[32m+[m[32mfunction validateForm() {[m
[32m+[m[32m  var x = document.forms["submit-form"]["text"].value;[m
[32m+[m[32m  if (x == "") {[m
[32m+[m[32m      alert("Can not submit an empty form");[m
[32m+[m[32m      return false;[m
[32m+[m[32m  }[m
[32m+[m[32m  else if ( x < 0 ) {[m
[32m+[m[32m      alert ("Exceed charater limit");[m
[32m+[m[32m      return false;[m
[32m+[m[32m  }[m[41m       [m
[32m+[m[32m}[m
 [m
 function renderTweets(tweets) {[m
   // loops through tweets[m
     // calls createTweetElement for each tweet[m
     // takes return value and appends it to the tweets container[m
[31m-    for(i=0; i<tweetData.length; i++){[m
[31m-      $('#tweets-posted').append(createTweetElement(tweetData[i]));[m
[32m+[m[32m    for(i=0; i<tweets.length; i++){[m
[32m+[m[32m      $('#tweets-posted').append(createTweetElement(tweets[i]));[m
     }[m
 }[m
 [m
[36m@@ -95,11 +84,7 @@[m [mfunction createfooter(data){[m
 return $footer;[m
 }[m
 [m
[31m-// var $tweet = createTweetElement(tweetData[0]);[m
 [m
[31m-// var $section = $('#tweets-posted');[m
[31m-// $section.append($tweet);[m
[31m-renderTweets(tweetData);[m
 [m
 });[m
 [m
[1mdiff --git a/public/scripts/composer-char-counter.js b/public/scripts/composer-char-counter.js[m
[1mindex 03a7112..1e3c6d7 100644[m
[1m--- a/public/scripts/composer-char-counter.js[m
[1m+++ b/public/scripts/composer-char-counter.js[m
[36m@@ -7,10 +7,7 @@[m [m$('textarea').keyup(function(){[m
     length = maxLength-length;[m
     $('.counter').text(length);[m
      if (length < 0){[m
[31m-        $('.counter').css('color', 'red');[m
[31m-    }[m
[31m-    else{[m
[31m-        next();[m
[32m+[m[32m        $('.counter').css('color', 'red');[m[41m    [m
     }[m
 });[m
 [m
