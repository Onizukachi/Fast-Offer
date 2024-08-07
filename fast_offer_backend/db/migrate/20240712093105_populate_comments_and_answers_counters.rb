class PopulateCommentsAndAnswersCounters < ActiveRecord::Migration[7.1]
  def up
    Answer.find_each { |record| Answer.reset_counters(record.id, :likes) }

    Question.find_each do |record|
      Question.reset_counters(record.id, :likes)
      Question.reset_counters(record.id, :answers)
    end
  end

  def down
    true
  end
end
