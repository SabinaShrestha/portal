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

  # describe "GET #show" do
  #   it "returns http success" do
  #     get :show
  #     expect(response).to have_http_status(:success)
  #   end
  # end

  # describe "GET #create" do
  #   it "returns http success" do
  #     get :create
  #     expect(response).to have_http_status(:success)
  #   end
  # end

  # describe "GET #update" do
  #   it "returns http success" do
  #     get :update
  #     expect(response).to have_http_status(:success)
  #   end
  # end

  describe "GET #destroy" do
    it "returns http success" do
      get :destroy, params: { course_id: course.id, enrollment_id: enrollment.id }
      expect(response).to be_successful
    end
  end

  end
end