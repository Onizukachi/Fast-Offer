class AddItPositionReferenceToQuestion < ActiveRecord::Migration[7.1]
  def change
    add_reference :questions, :it_grades, null: false, foreign_key: true
  end
end
