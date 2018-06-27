class AddHomepageToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :homepage, :string, default: '/courses'
  end
end
