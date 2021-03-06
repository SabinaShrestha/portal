Rails.application.routes.draw do

  mount_devise_token_auth_for 'User', at: 'api/auth'
  namespace :api do
    resources :courses do
      resources :quizzes do 
        resources :questions
      end
      resources :assignments
      resources :attendances
      get '/attendances/:user_id', to: 'attendances#index'
      post '/attendances/:user_id', to: 'attendances#create'
      resources :enrollments
      get '/get_students', to: 'enrollments#get_students'
      resources :units
      resources :wikis
      resources :groups
      resources :course_navs, only: [:index]
      resources :submissions
      post '/copy_course/:id', to: 'courses#copy_course'
      get '/assignment_submissions', to: 'submissions#assignment_submissions'
      get '/quiz_submissions', to: 'submissions#quiz_submissions'
      put '/update_course_navs', to: 'course_navs#update_course_navs'
    end
    resources :users, only: :update
  end

  #Do not place any routes below this one
  get '*other', to: 'static#index'
end
