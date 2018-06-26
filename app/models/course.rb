class Course < ApplicationRecord
  #associations
  has_many :course_navs
  has_many :course_files
  has_many :wikis
  has_many :grading_groups
  has_many :groups
  has_many :enrollments, dependent: :destroy
  has_many :users, through: :enrollments
  has_many :units
end
