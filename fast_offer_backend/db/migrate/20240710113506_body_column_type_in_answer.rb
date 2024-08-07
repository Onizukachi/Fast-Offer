class BodyColumnTypeInAnswer < ActiveRecord::Migration[7.1]
  def up
    change_column :answers, :body, :text
  end

  def down
    change_column :answers, :body, :string
  end
end
