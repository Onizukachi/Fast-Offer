# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Answers', type: :request do
  let(:user) { create(:user) }
  let!(:question) { create(:question) }
  let(:valid_attributes) { { answer: { body: Faker::Lorem.paragraph_by_chars } } }

  describe 'POST /api/v1/questions/:question_id/answers' do
    context 'when logged in' do
      before { post api_v1_question_answers_path(question), params: valid_attributes, headers: authenticated_header(user) }

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end

      it 'create answer' do
        expect(Answer.count).to eq(1)
      end
    end

    context 'when logged out' do
      before { post api_v1_question_answers_path(question), params: valid_attributes }

      it 'returns status code 401' do
        expect(response).to have_http_status(401)
      end
    end
  end
end
