class RenamePositionsQuestionsToPositionQuestions < ActiveRecord::Migration[7.1]
  def change
    rename_table :positions_questions, :position_questions
  end
end
