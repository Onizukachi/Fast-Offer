class AddCounterCacheToQuestion < ActiveRecord::Migration[7.1]
  def change
    add_column :questions, :likes_count, :integer, default: 0
  end
end
