# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Likes', type: :request do
  let(:user) { create(:user) }
  let!(:question) { create(:question) }
  let(:valid_attributes) { { like: { likeable_id: question.id, likeable_type: Question.model_name.human } } }

  describe 'POST /api/v1/likes' do
    context 'when logged in' do
      before { post api_v1_likes_path, params: valid_attributes, headers: authenticated_header(user) }

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end

      it 'create like' do
        expect(Like.count).to eq(1)
      end
    end

    context 'when logged out' do
      before { post api_v1_likes_path, params: valid_attributes }

      it 'returns status code 401' do
        expect(response).to have_http_status(401)
      end
    end
  end

  context 'DELETE /api/v1/likes/unlike' do
    context 'when logged in' do
      subject { delete unlike_api_v1_likes_path, params: valid_attributes[:like], headers: authenticated_header(user) }

      context 'when like present' do
        before do
          create(:like, user:, likeable: question)
          subject
        end

        it 'returns status code 204' do
          expect(response).to have_http_status(204)
        end

        it 'delete like' do
          expect(Like.count).to be_zero
        end
      end

      context 'when like not found' do
        before { subject }

        it 'returns status code 404' do
          expect(response).to have_http_status(404)
        end
      end
    end

    context 'when logged out' do
      before { delete unlike_api_v1_likes_path , params: valid_attributes[:like] }

      it 'returns status code 401' do
        expect(response).to have_http_status(401)
      end
    end
  end
end
