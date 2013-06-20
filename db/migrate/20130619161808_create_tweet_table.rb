class CreateTweetTable < ActiveRecord::Migration
  def change
  	create_table :tweets do |t|
  		t.text :status
  		t.references :user
  		t.timestamps
  	end
  end
end
