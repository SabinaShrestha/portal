require 'rails_helper'

RSpec.describe Course, type: :model do

  describe 'associations' do
    it { should have_many(:course_navs) }
    it { should have_many(:course_files) }
    it { should have_many(:wikis) }
    it { should have_many(:grading_groups) }
    it { should have_many(:groups) }
    it { should have_many(:enrollments) }
    it { should have_many(:users).through(:enrollments)  }
    it { should have_many(:units) }
  end

  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:description) }
    it { should validate_presence_of(:department) }
  end

end