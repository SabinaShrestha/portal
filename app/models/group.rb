class Group < ApplicationRecord
  validates :name, presence: true
  belongs_to :course
  has_many :group_memberships, dependent: :destroy
  has_many :enrollments, through: :group_memberships
end
