class Wiki < ApplicationRecord
  validates :wiki_type, :title, :body, presence: true
  belongs_to :course
end
