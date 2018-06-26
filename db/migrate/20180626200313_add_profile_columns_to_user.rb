class AddProfileColumnsToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :phone, :string
    add_column :users, :is_admin, :boolean, default: false
    add_column :users, :homepage, :string, default: '/courses'
    add_column :users, :bio, :text
  end
end
