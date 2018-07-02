class AddPublishedAndPublishAtToAnnouncements < ActiveRecord::Migration[5.2]
  def change
    add_column :announcements, :published, :boolean
    add_column :announcements, :publish_at, :datetime
  end
end
