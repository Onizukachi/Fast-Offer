class AddCounterCacheToAnswer < ActiveRecord::Migration[7.1]
  def change
    add_column :answers, :likes_count, :integer, default: 0
  end
end
