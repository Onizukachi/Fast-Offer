# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ItGrade, type: :model do
  it { should define_enum_for(:grade) }
end
