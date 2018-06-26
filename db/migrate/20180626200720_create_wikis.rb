class CreateWikis < ActiveRecord::Migration[5.2]
  def change
    create_table :wikis do |t|
      t.belongs_to :course, foreign_key: true
      t.boolean :pinned, default: false
      t.boolean :published, default: false
      t.boolean :public, default: false
      t.datetime :publish_at
      t.string :wiki_type
      t.string :title
      t.text :body

      t.timestamps
    end
  end
end
