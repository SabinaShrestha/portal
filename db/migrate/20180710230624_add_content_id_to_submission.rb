class AddContentIdToSubmission < ActiveRecord::Migration[5.2]
  def change
    add_column :submissions, :content_id, :integer
  end
end
