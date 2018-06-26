class CreateUnitItems < ActiveRecord::Migration[5.2]
  def change
    create_table :unit_items do |t|
      t.belongs_to :unit, foreign_key: true
      t.string :item_type
      t.string :item_id

      t.timestamps
    end
  end
end
