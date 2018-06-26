class CreateQuizzes < ActiveRecord::Migration[5.2]
  def change
    create_table :quizzes do |t|
      t.belongs_to :course, foreign_key: true
      t.belongs_to :grading_group, foreign_key: true
      t.string :name
      t.string :quiz_type
      t.float :points
      t.boolean :multiple_attempts, default: false
      t.boolean :shuffle, default: false
      t.boolean :published, default: false
      t.datetime :available_from
      t.datetime :available_until
      t.json :quiz_settings
      t.time :time_limit
      t.datetime :due_date

      t.timestamps
    end
  end
end
