class CreateAnnouncements < ActiveRecord::Migration[5.2]
  def change
    create_table :announcements do |t|
      t.string :body
      t.belongs_to :course, foreign_key: true

      t.timestamps
    end
  end
end
