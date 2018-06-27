class Unit < ApplicationRecord
  belongs_to :course
  validates :name, presence: true
  validates :position, presence: true
end
