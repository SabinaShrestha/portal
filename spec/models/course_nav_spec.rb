require 'rails_helper'

RSpec.describe CourseNav, type: :model do 
  let(:course) { FactoryBot.create(:course) }

  it { should belong_to(:course)}
  it { should validate_presence_of(:name)}
  it { should validate_presence_of(:priority)}

  describe 'class methods' do
    context 'reorder and change visibility' do
      before(:each) do 
        @course = course
        @navs = @course.course_navs.map do |nav| 
          if nav.priority == @course.course_navs.length - 1
            nav.priority = 0
          else
            nav.priority = nav.priority + 1
          end
          nav
        end
      end

      it 'should reorder course navs' do
        CourseNav.update_position(@navs)
        @course.reload
        expect(@course.course_navs.map(&:priority)).to eq(@navs.map(&:priority))
      end

      it 'should change visibility' do
        nav = @navs.first
        nav.visible = false
        CourseNav.update_position(@navs)
        expect(@course.course_navs.find(nav.id).visible).to eq(false)
      end
    end
  end
end
