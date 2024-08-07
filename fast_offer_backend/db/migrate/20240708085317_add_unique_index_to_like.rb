class AddUniqueIndexToLike < ActiveRecord::Migration[7.1]
  def change
    add_index :likes, %i[user_id likeable_type likeable_id], unique: true
  end
end
