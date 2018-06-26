class CreateAssignments < ActiveRecord::Migration[5.2]
  def change
    create_table :assignments do |t|
      t.belongs_to :course, foreign_key: true
      t.belongs_to :grading_group, foreign_key: true
      t.string :title
      t.text :description
      t.datetime :due_date
      t.float :points
      t.boolean :published, default: false
      t.string :submission_type
      t.string :grade_type
      t.datetime :unlocks_at
      t.datetime :locks_at

      t.timestamps
    end
  end
end
