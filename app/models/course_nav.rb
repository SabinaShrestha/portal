class CourseNav < ApplicationRecord
  belongs_to :course

  validates_presence_of :name, :priority
end
