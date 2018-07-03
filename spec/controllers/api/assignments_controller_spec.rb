require 'rails_helper'

RSpec.describe Api::AssignmentsController, type: :controller do
  let(:course) { FactoryBot.create(:course) }
  login_user

  describe "GET #index" do
    it "returns http success" do
      get :index, params: { course_id: course.id }
      expect(response).to have_http_status(:success)
    end
  end

end
