class AddImageFileNameToPosition < ActiveRecord::Migration[7.1]
  def change
    add_column :positions, :image_filename, :string
    add_index :positions, :image_filename, unique: true
  end
end
