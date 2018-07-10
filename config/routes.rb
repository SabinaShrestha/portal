Rails.application.routes.draw do

  mount_devise_token_auth_for 'User', at: 'api/auth'
  namespace :api do
    resources :courses do
      resources :quizzes
      resources :assignments
      resources :attendances
      resources :enrollments
      get '/get_students', to: 'enrollments#get_students'
      resources :units
      resources :wikis
      resources :groups
      resources :course_navs, only: [:index]
      resources :enrollments
      resources :submissions
    end
    resources :users, only: :update
  end

  #Do not place any routes below this one
  get '*other', to: 'static#index'
end
