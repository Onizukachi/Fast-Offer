class CreateVacancies < ActiveRecord::Migration[7.1]
  def change
    create_table :vacancies do |t|
      t.references :position, null: false, foreign_key: true
      t.integer :hh_id
      t.string :name
      t.string :email
      t.string :location
      t.integer :salary_from
      t.integer :salary_to
      t.string :salary_currency
      t.datetime :published_at
      t.string :skills, array: true, default: []

      t.timestamps
    end

    add_index :vacancies, :skills, using: 'gin'
    add_index :vacancies, :hh_id, unique: true
  end
end
