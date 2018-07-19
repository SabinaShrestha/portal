class DefaultImageToUsers < ActiveRecord::Migration[5.2]
	def up
		default = 'https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png'
		change_column :users, :image, :string, default: default
		User.where(image: nil).update_all(image: default)
	end

	def down
		default = 'https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png'
		change_column :users, :image, :string, default: nil
		User.where(image: default).update_all(image: nil)
	end
end
