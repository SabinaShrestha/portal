require 'rails_helper'

RSpec.describe Course, type: :model do
  let(:course) { FactoryBot.create(:course) }
  let(:concluded) { FactoryBot.create(:concluded) }
  let(:unpublished) { FactoryBot.create(:unpublished) }
  let(:user) { FactoryBot.create(:user) }
  let(:student) { FactoryBot.create(:student) }
  let(:observer) { FactoryBot.create(:observer) }
  let(:teacher) { FactoryBot.create(:teacher) }
  let(:ta) { FactoryBoot.create(:ta) }

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

  describe 'class methoods' do
    context "self.active" do
      it "should return all courses not concluded" do
        concluded
        course2 = course
        course3 = unpublished
        results = Course.active
        expect(results).to eq([course2, course3])
      end
    end

    context "self.active_with_enrollments(id)" do
      before(:each) do
        @course = course
        @concluded = concluded
        @unpublished = unpublished
      end

      it "should return active published courses for students" do
        FactoryBot.create(:student, course: @course, user: user)
        FactoryBot.create(:student, course: @concluded, user: user)
        FactoryBot.create(:student, course: @unpublished, user: user)
        results = Course.active_with_enrollments(user.id)
        expect(results).to eq([@course])
      end

      it "should return active published courses for observers" do
        FactoryBot.create(:observer, course: @course, user: user)
        FactoryBot.create(:observer, course: @concluded, user: user)
        FactoryBot.create(:observer, course: @unpublished, user: user)
        results = Course.active_with_enrollments(user.id)
        expect(results).to eq([@course])
      end

      it "should return active published and unpublished courses for teachers" do
        FactoryBot.create(:teacher, course: @course, user: user)
        FactoryBot.create(:teacher, course: @concluded, user: user)
        FactoryBot.create(:teacher, course: @unpublished, user: user)
        results = Course.active_with_enrollments(user.id)
        binding.pry
        expect(results).to eq([@course, @unpublished])
      end

      it "should return active published and unpublished courses for ta's" do
        FactoryBot.create(:ta, course: @course, user: user)
        FactoryBot.create(:ta, course: @concluded, user: user)
        FactoryBot.create(:ta, course: @unpublished, user: user)
        results = Course.active_with_enrollments(user.id)
        expect(results).to eq([@course, @unpublished])
      end
    end

  end


end
