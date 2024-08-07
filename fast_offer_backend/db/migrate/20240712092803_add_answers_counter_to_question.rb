class AddAnswersCounterToQuestion < ActiveRecord::Migration[7.1]
  def change
    add_column :questions, :answers_count, :integer, default: 0
  end
end
