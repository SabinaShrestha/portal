class CreateQuestions < ActiveRecord::Migration[5.2]
  def change
    create_table :questions do |t|
      t.belongs_to :quiz, foreign_key: true
      t.string :answer_type
      t.float :points
      t.text :body
      t.json :question_data

      t.timestamps
    end
  end
end
