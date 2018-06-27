require 'rails_helper'

RSpec.describe GroupMembership, type: :model do

  describe 'associations' do
    it { should belong_to(:enrollment)}
    it { should belong_to(:group)}
  end

  describe 'attributes' do 
    it 'can have a group leader' do
      group_leader = true
      group_membership = GroupMembership.create(group_leader: true)
      expect(group_membership.group_leader).to eq(group_leader)
    end

    it 'does not have to have a group leader' do
      group_leader = false
      group_membership = GroupMembership.create(group_leader: false)
      expect(group_membership.group_leader).to eq(group_leader)
    end
  end
end
