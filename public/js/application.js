function Dom() {}
 
Dom.prototype.update = function(tweets) {
  $('.tweet_table').children().children('.tweets').remove();
  tweets.forEach(function(tweet) {
    $('.tweet_table').append('<tr class="tweets"><td class="tweet">' + tweet.content + '</td><td class="status">' + tweet.status + '</td></tr>');
  });
};
 
function Table() {
  var tweets = [];
  var dom = new Dom();
 
  this.addTweet = function(tweet) {
    tweets.push(tweet);
    dom.update(tweets);
  };
 
  this.checkTweetStatus = function() {
    tweets.forEach(function(tweet) {
      tweet.updateStatus();
    });
    dom.update(tweets);
  };
}
 
function Tweet(content) { 
	this.content = content;
	this.jid = null;
	this.status = "working";
}

Tweet.prototype.getJID = function(form_data) {
	var tweet = this;
	$.ajax({
    type: 'post',
    url: '/tweet',
    data: form_data
  }).done(function(job_id) {
  	tweet.jid = job_id;
  	tweet.updateStatus();
  });	
}
 
Tweet.prototype.updateStatus = function() {
	var tweet = this;
	$.ajax({
		type: 'get',
		url: '/status/' + tweet.jid
	}).done(function(response) {
		tweet.status = response;
	});
};

$(document).ready(function() {
  var table = new Table();

  $('#submit_tweet_form').on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    var content = $(this).children('textarea').val();
    var tweet = new Tweet(content);
    tweet.getJID(formData);
    table.addTweet(tweet);
  });

  (function statusUpdater() {
  	table.checkTweetStatus();
  	setTimeout(function() { statusUpdater() }, 3000);
  })();
});
