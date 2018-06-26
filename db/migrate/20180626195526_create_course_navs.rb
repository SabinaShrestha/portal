class CreateCourseNavs < ActiveRecord::Migration[5.2]
  def change
    create_table :course_navs do |t|
      t.belongs_to :course, foreign_key: true
      t.string :name
      t.boolean :visible, default: true
      t.integer :priority

      t.timestamps
    end
  end
end
