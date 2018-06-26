class CourseFile < ApplicationRecord
  belongs_to :course

  validates_presence_of :url
end
