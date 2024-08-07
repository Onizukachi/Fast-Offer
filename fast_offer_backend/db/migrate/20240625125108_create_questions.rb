class CreateQuestions < ActiveRecord::Migration[7.1]
  def change
    create_table :questions do |t|
      t.text :body, null: false
      t.integer :views_count, default: 0

      t.timestamps
    end
  end
end
