require 'rails_helper'

RSpec.describe Enrollment, type: :model do

  describe 'associations' do
    it { should belong_to(:user) }
    it { should belong_to(:course) }
    it { should have_many(:group_memberships) }
    it { should have_many(:groups).through(:group_memberships) }
  
    describe 'attributes' do
    it 'has a role' do
      role = 'Student'
      user = Enrollment.create(role: role)
      expect(user.role).to eq(role)

    describe 'validations' do
      context 'validate' do
        it { should validate_inclusion_of(:role).in_array(%w(student ta teacher auditor)) }  
    end
  end
end
 