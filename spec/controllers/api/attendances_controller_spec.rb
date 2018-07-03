require 'rails_helper'
RSpec.describe Api::AttendancesController, type: :controller do
  
  login_user
  let(:course) { FactoryBot.create(:course) }
  let(:enrollment) { FactoryBot.create(:enrollment, user: @user, course: course, role: 'student') }
  let(:attendance) { FactoryBot.create(:attendance) }
  
  describe "GET #index" do
    it "returns http success" do
      get :index, params: { course_id: course.id, enrollment_id: enrollment.id }
      expect(response).to be_successful
    end
  end

  describe "DELETE #destroy" do
    it "returns http success" do
      delete :destroy, params: { course_id: course.id, id: attendance.id }
      expect(response).to be_successful
    end
  end

end
