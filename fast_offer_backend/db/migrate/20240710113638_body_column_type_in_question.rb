class BodyColumnTypeInQuestion < ActiveRecord::Migration[7.1]
  def up
    change_column :questions, :body, :text
  end

  def down
    change_column :questions, :body, :string
  end
end
