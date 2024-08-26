class CreateCronAnalyticsLogs < ActiveRecord::Migration[7.1]
  def change
    create_table :cron_analytics_logs do |t|
      t.references :position, null: false, foreign_key: true, index: { unique: true }
      t.integer :vacancies_processed, default: 0

      t.timestamps
    end
  end
end
