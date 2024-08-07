class CreatePositions < ActiveRecord::Migration[7.1]
  def change
    create_table :positions do |t|
      t.string :title

      t.timestamps
    end

    add_index :positions, :title, unique: true
  end
end
