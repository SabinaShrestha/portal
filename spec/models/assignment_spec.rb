require 'rails_helper'

RSpec.describe Assignment, type: :model do 
  it { should belong_to(:course)}
  it { should belong_to(:grading_group)}

  describe 'validations' do 
    it { should validate_presence_of(:title)}
    it { should validate_presence_of(:description)}

    it { should validate_inclusion_of(:grade_type).in_array(%w(graded not_graded complete_incomplete points)) }
  end
end