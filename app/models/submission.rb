class Submission < ApplicationRecord
  belongs_to :enrollment
  belongs_to :quiz, optional: true
  belongs_to :assignment, optional: true

  validates_presence_of :due_date
  validates_presence_of :date_submitted
  validates_presence_of :grade_type
  validates_presence_of :sub_type
end
