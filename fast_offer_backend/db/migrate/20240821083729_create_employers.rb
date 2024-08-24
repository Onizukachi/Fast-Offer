class CreateEmployers < ActiveRecord::Migration[7.1]
  def change
    create_table :employers do |t|
      t.string :name
      t.string :url

      t.timestamps
    end

    add_index :employers, :name, unique: true
  end
end
