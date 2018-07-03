class CourseNav < ApplicationRecord
  belongs_to :course

  validates_presence_of :name, :priority, :url

  def self.update_position(navs = [])
    navs.each do |nav|
      CourseNav.update(nav[:id], { priority: nav[:priority], visible: nav[:visible] })
    end
  end
end
