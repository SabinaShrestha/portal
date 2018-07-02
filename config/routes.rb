Rails.application.routes.draw do

  mount_devise_token_auth_for 'User', at: 'api/auth'
  namespace :api do
    resources :courses do
      resources :quizzes
      resources :assignments
      resources :units
      resources :wikis
      resources :groups
      resources :course_navs, only: [:index]
      resources :attendances, only: [:index, :create, :edit]
    end
    resources :users, only: :update
  end

  #Do not place any routes below this one
  get '*other', to: 'static#index'
end
