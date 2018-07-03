require 'rails_helper'

RSpec.describe Api::CoursesController, type: :controller do
  let(:course) { FactoryBot.create(:course) }
  let(:attr) { FactoryBot.attributes_for(:course) }

  login_user

  describe "GET #index" do
    it "returns http success" do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #show" do
    it "returns http success" do
      get :show, params: { id: course.id }
      expect(response).to have_http_status(:success)
    end
  end

  describe "POST #create" do
    it "returns http success" do
      post :create, params: { course: attr }
      expect(response).to have_http_status(:success)
    end
  end

  describe "PUT #update" do
    it "returns http success" do
      put :update, params: { id: course.id, course: attr }
      expect(response).to have_http_status(:success)
    end
  end

  describe "DELETE #destroy" do
    it "returns http success" do
      delete :destroy, params: { id: course.id }
      expect(response).to have_http_status(:success)
    end
  end

end
