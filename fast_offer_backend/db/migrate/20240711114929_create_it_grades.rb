class CreateItGrades < ActiveRecord::Migration[7.1]
  def change
    create_table :it_grades do |t|
      t.integer :grade, default: 0

      t.timestamps
    end
  end
end
