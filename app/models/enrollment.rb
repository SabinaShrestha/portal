class Enrollment < ApplicationRecord
  belongs_to :user
  belongs_to :course
  has_many :group_memberships, dependent: :destroy
  has_many :groups, through: :group_memberships
  #not sure about this association
  has_many :attendances

  validates_inclusion_of :role, in: %w(ta student teacher observer)

  validates_uniqueness_of :user_id, scope: :course_id
end
