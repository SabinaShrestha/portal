class Attendance < ApplicationRecord
  belongs_to :enrollment
  belongs_to :course
  validates_presence_of :date
end
