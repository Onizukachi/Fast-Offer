class AddIsBannedToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :is_banned, :boolean, null: false, default: false
  end
end
