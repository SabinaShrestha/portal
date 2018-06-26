require 'rails_helper'

RSpec.describe Group, type: :model do
  
  it { should belong_to(:course) }
  
  describe 'attributes' do 
    it 'has a name' do
      name = 'Test Group'
      group = Group.create(name: name)
      expect(group.name).to eq(name)
    end
  end

  describe 'associations' do
    it { should belong_to(:course) }
    it { should have_many(:group_memberships) }
    it { should have_many(:enrollments).through(:group_memberships) }
  end

  describe 'validations' do
    context 'validate' do
      it { should validate_presence_of(:name) }
    end
  end

end


