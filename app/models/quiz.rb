class Quiz < ApplicationRecord
  validates :title, :quiz_type, presence: true
  belongs_to :course
  belongs_to :grading_group, optional: true
  has_many :questions
end
