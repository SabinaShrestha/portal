class Enrollment < ApplicationRecord
  belongs_to :user
  belongs_to :course
  has_many :group_memberships, dependent: :destroy
  has_many :groups, through: :group_memberships
end
