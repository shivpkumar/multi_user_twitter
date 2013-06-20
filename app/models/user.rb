class User < ActiveRecord::Base
  validates_uniqueness_of :username
  has_many :tweets

  def tweet(status, time)
    tweet = tweets.create!(:status => status)
    if time == 0
    	TweetWorker.perform_async(tweet.id)
    else
    	TweetWorker.perform_in(time.minutes, tweet.id)
    end
  end
end
