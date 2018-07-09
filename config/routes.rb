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
      resources :attendances
      put 'update_course_navs', to: 'course_navs#update_course_navs'
      post 'copy_course/:id', to: 'courses#copy_course'
    end
    resources :users, only: :update
  end

  #Do not place any routes below this one
  get '*other', to: 'static#index'
end
