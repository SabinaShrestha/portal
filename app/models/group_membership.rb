class GroupMembership < ApplicationRecord
  belongs_to :enrollment
  belongs_to :group

end
