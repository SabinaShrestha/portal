class CreateSubmissions < ActiveRecord::Migration[5.2]
  def change
    create_table :submissions do |t|
      t.belongs_to :enrollment, foreign_key: true
      t.belongs_to :quiz, foreign_key: true, optional: true
      t.belongs_to :assignment, foreign_key: true, optional: true
      t.datetime :due_date
      t.datetime :date_submitted
      t.boolean :grade_type
      t.string :sub_type

      t.timestamps
    end
  end
end
