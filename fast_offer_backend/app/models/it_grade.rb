# frozen_string_literal: true

class ItGrade < ApplicationRecord
  self.table_name = 'it_grades'

  enum :grade, %i[junior middle senior]
end
