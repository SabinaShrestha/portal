class GradingGroup < ApplicationRecord
  belongs_to :course

  validates_presence_of :name, :weight
end
