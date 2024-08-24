class AddEmployerReferencesToVacancies < ActiveRecord::Migration[7.1]
  def change
    add_reference :vacancies, :employer, null: false, foreign_key: true
  end
end
