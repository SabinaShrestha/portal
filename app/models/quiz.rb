class Quiz < ApplicationRecord
  belongs_to :course
  belongs_to :grading_group, optional: true
  has_many :questions
end
