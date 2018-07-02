require 'rails_helper'

#FactoryBot.create(:submission)

RSpec.describe Submission, type: :model do
  describe 'associations' do
    it { should belong_to(:enrollment)}
    it { should belong_to(:quiz)}
    it { should belong_to(:assignment)}
  end

  describe 'validations' do
    it { should validate_presence_of(:due_date)}
    it { should validate_presence_of(:date_submitted)}
    it { should validate_presence_of(:grade_type)}
    it { should validate_presence_of(:sub_type)}
  end
end
