require 'rails_helper'

RSpec.describe UnitItem, type: :model do

  describe 'attributes' do
    it { should respond_to(:item_type) }
  end

  describe 'associations' do
  it { should belong_to(:unit) }
  end
end


