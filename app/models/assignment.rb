class Assignment < ApplicationRecord
  belongs_to :course
  belongs_to :grading_group, optional: true
end
