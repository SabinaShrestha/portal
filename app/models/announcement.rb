class Announcement < ApplicationRecord
  belongs_to :course

  validates_presence_of :body, :course_id, :published, :publish_at
end
