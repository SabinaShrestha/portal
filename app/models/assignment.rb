class Assignment < ApplicationRecord
  belongs_to :course
  belongs_to :grading_group, optional: true

  validates_presence_of :title, :description
  validates_inclusion_of :grade_type, in: %w(graded not_graded complete_incomplete points)

end
