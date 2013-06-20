class TweetWorker
  include Sidekiq::Worker

  def perform(tweet_id)
    tweet = Tweet.find(tweet_id)
    user  = tweet.user

    client = Twitter::Client.new(oauth_token: user.oauth_token, 
    														 oauth_token_secret: user.oauth_secret)

    sleep(rand(10))

    client.update(tweet.status)
  end
end
