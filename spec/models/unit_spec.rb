require 'rails_helper'

RSpec.describe Unit, type: :model do

  describe 'attributes' do
    it { should respond_to(:name) }
    it { should respond_to(:position) }
  end

  describe 'associations' do
    it { should belong_to(:course) }
  end

  describe 'validations' do
    context 'validate' do
     it { should validate_presence_of(:name) }
     it { should validate_presence_of(:position) }
    end
  end
end
