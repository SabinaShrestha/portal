class ChangeSubTypeToBeJsonInSubmissions < ActiveRecord::Migration[5.2]
  def change
    change_column :submissions, :sub_type, :json, using: 'sub_type::JSON'
  end
end
