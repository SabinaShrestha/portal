class CreateGroupMemberships < ActiveRecord::Migration[5.2]
  def change
    create_table :group_memberships do |t|
      t.belongs_to :enrollment, foreign_key: true
      t.belongs_to :group, foreign_key: true
      t.boolean :group_leader

      t.timestamps
    end
  end
end
