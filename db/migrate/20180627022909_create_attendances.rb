class CreateAttendances < ActiveRecord::Migration[5.2]
  def change
    create_table :attendances do |t|
      t.boolean :present
      t.boolean :tardy
      t.time :tardy_time
      t.text :reason
      t.boolean :excused
      t.boolean :absent
      t.string :date
      t.float :total_attendance
      t.string :badge
      t.belongs_to :enrollment, foreign_key: true
      t.belongs_to :course, foreign_key: true

      t.timestamps
    end
  end
end
