class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  #associations
  has_many :enrollments, dependent: :destroy
  has_many :courses, through: :enrollments
end
