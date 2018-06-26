class CreateCourseFiles < ActiveRecord::Migration[5.2]
  def change
    create_table :course_files do |t|
      t.string :url
      t.boolean :published, default: false
      t.belongs_to :course, foreign_key: true

      t.timestamps
    end
  end
end
