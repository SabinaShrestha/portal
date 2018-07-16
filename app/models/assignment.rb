class Assignment < ApplicationRecord
  belongs_to :course
  belongs_to :grading_group, optional: true

  validates_presence_of :title, :description
end
