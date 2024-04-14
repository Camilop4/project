Rails.application.routes.draw do
  namespace :api do
    resources :features do
    resources :comments, only: [:create]
    end
  end
  # manejo de la ruta"/""
  root to: 'api/features#index'
end
