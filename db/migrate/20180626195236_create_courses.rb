class CreateCourses < ActiveRecord::Migration[5.2]
  def change
    create_table :courses do |t|
      t.string :name
      t.string :description
      t.string :time_zone
      t.string :department
      t.datetime :starts
      t.datetime :ends
      t.boolean :lock_after_end, default: false
      t.boolean :lock_before_start, default: false
      t.json :course_options
      t.json :feature_flags
      t.string :course_home
      t.boolean :published, default: false
      t.boolean :concluded, default: false

      t.timestamps
    end
  end
end
