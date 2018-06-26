class CreateGradingGroups < ActiveRecord::Migration[5.2]
  def change
    create_table :grading_groups do |t|
      t.string :name
      t.float :weight
      t.belongs_to :course, foreign_key: true

      t.timestamps
    end
  end
end
