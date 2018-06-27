class Attendance < ApplicationRecord
  belongs_to :enrollment
  belongs_to :course
  
end
