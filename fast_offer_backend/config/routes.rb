require 'sidekiq/web'
require 'sidekiq/cron/web'

# Configure Sidekiq-specific session middleware
Sidekiq::Web.use ActionDispatch::Cookies
Sidekiq::Web.use ActionDispatch::Session::CookieStore, key: '_interslice_session'

Rails.application.routes.draw do
  get 'up' => 'rails/health#show', as: :rails_health_check

  mount Sidekiq::Web => '/sidekiq'

  devise_for :users, defaults: { format: :json },
                     path: 'api/v1',
                     path_names: {
                       sign_in: 'login',
                       sign_out: 'logout',
                       registration: 'signup'
                     },
                     controllers: {
                       sessions: 'api/v1/users/sessions',
                       registrations: 'api/v1/users/registrations'
                     }

  namespace :api do
    namespace :v1 do
      resources :questions do
        resources :answers do
        end
      end
      resources :positions, except: %i[show]
      resources :analytics, only: %i[index]
      resources :likes, only: [:create] do
        collection do
          delete 'unlike', to: 'likes#unlike'
        end
      end
      resources :comments
      resources :it_grades, only: %i[index]
      resources :tags, only: %i[index]
      resources :favorites, only: %i[index create] do
        collection do
          delete 'unfavorite', to: 'favorites#unfavorite'
        end
      end
    end
  end
end
