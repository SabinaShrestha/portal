require 'rails_helper'

RSpec.describe Api::CourseNavsController, type: :controller do
  login_user
  let(:course) { FactoryBot.create(:course) }

  describe "GET #index" do
    it "returns http success" do
      get :index, params: { course_id: course.id }
      expect(response).to have_http_status(:success)
    end
  end

  describe "PUT #update_course_navs" do
    it "returns https success" do
      nav = FactoryBot.create(:course_nav, course_id: course.id)      
      put :update_course_navs, params: { course_id: course.id, navs: [nav.attributes] }
      expect(response).to have_http_status(:success)
    end
  end

end
