require 'rails_helper'

RSpec.describe GradingGroup, type: :model do

  describe 'attributes' do
    it { should respond_to(:name) }
    it { should respond_to(:weight) }
  end

  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:weight)}
  end

  describe 'associations' do
    it { should belong_to(:course)}
  end

end