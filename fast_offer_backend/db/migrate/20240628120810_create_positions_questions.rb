class CreatePositionsQuestions < ActiveRecord::Migration[7.1]
  def change
    create_table :positions_questions do |t|
      t.references :position, null: false, foreign_key: true
      t.references :question, null: false, foreign_key: true

      t.timestamps
    end

    add_index :positions_questions, %i[position_id question_id], unique: true
  end
end
