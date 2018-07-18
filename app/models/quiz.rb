class Quiz < ApplicationRecord
  validates :name, :quiz_type, presence: true
  belongs_to :course
  belongs_to :grading_group, optional: true
  has_many :questions, dependent: :destroy
end
