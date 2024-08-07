# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Questions', type: :request do
  let!(:author) { create(:author) }
  let!(:questions) { create_list(:question, 5) }
  let!(:question_id) { questions.first.id }

  describe 'GET /api/v1/questions' do
    before do
      get api_v1_questions_path
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end

    it 'returns questions' do
      expect(json['data']).not_to be_empty
      expect(json['data'].size).to eq(5)
    end
  end

  describe 'GET /api/v1/questions/:id' do
    before { get api_v1_question_path(question_id) }

    context 'when question exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns the question item' do
        expect(json['data']['id'].to_i).to eq(question_id)
      end
    end

    context 'when question does not exist' do
      let(:question_id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end
    end
  end

  # describe 'POST /api/v1/questions' do
  #   # let!(:question) { create(:question) }
  #
  #   let(:valid_attributes) do
  #     { body: Faker::Lorem.question(word_count: 5),
  #       category_id: history.id }
  #   end
  #
  #   context 'when request attributes are valid' do
  #     before { post '/api/v1/books', params: valid_attributes }
  #
  #     it 'returns status code 201' do
  #       expect(response).to have_http_status(201)
  #     end
  #   end
  #
  #   context 'when an invalid request' do
  #     before { post '/api/v1/books', params: {} }
  #
  #     it 'returns status code 422' do
  #       expect(response).to have_http_status(422)
  #     end
  #
  #     it 'returns a failure message' do
  #       expect(response.body).to include("can't be blank")
  #     end
  #   end
  # end
  #
  # describe 'PUT /books/:id' do
  #   let(:valid_attributes) { { title: 'Saffron Swords' } }
  #
  #   before { put "/api/v1/books/#{book_id}", params: valid_attributes }
  #
  #   context 'when book exists' do
  #     it 'returns status code 204' do
  #       expect(response).to have_http_status(204)
  #     end
  #
  #     it 'updates the book' do
  #       updated_item = Book.find(book_id)
  #       expect(updated_item.title).to match(/Saffron Swords/)
  #     end
  #   end
  #
  #   context 'when the book does not exist' do
  #     let(:book_id) { 0 }
  #
  #     it 'returns status code 404' do
  #       expect(response).to have_http_status(404)
  #     end
  #
  #     it 'returns a not found message' do
  #       expect(response.body).to include("Couldn't find Book with 'id'=0")
  #     end
  #   end
  # end
  #
  # describe 'DELETE /books/:id' do
  #
  #   before { delete "/api/v1/books/#{book_id}" }
  #
  #   it 'returns status code 204' do
  #     expect(response).to have_http_status(204)
  #   end
  # end
end
