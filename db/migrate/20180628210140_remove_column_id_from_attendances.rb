class RemoveColumnIdFromAttendances < ActiveRecord::Migration[5.2]
  def change
    remove_column :attendances, :course_id
  end
end
