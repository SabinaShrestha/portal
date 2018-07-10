require 'rails_helper'

RSpec.describe Api::AnnouncementsController, type: :controller do
  login_user

  let (:course) { FactoryBot.create(:course) }
  let (:valid_attributes) {
    { body: "hello world",
      published: true,
      publish_at: DateTime.now }
  }
  let (:invalid_attributes) {
    { body: "",
      published: nil,
      publish_at: nil}
  }

  describe "GET #index" do
    it "returns http success" do
      get :index, params: { course_id: course.id}
      expect(response).to be_successful
    end
  end

  describe "GET #show" do
    it "returns http success" do
      announcement = course.announcements.create! valid_attributes
      get :show, params: { id: announcement.id, course_id: course.id }
      expect(response).to be_successful
    end
  end

  describe "POST #create" do
    context "with valid params"
      it "create a new announcement" do
        expect {
          post :create, params: { course_id: course.id, announcement: valid_attributes }
        }.to change(Announcement, :count).by(1)
      end

      it 'returns the created announcement' do
        post :create, params: { course_id: course.id, announcement: valid_attributes}
        expect(response).to be_successful
      end
    context "with invalid params"
      it 'does not create an announcement' do
        expect {
          post :create, params: { course_id: course.id, announcement: invalid_attributes }
        }.to change(Announcement, :count).by(0)
      end

      it "returns an error" do
        post :create, params: { course_id: course.id, announcement: invalid_attributes}
        expect(response).to have_http_status(422)
      end 
  end

  describe "PUT #update" do
    context "with valid params" do
      let(:new_attributes){
        {body: "Pizza is great"}
      }
      it "updates announcement body" do
        announcement = course.announcements.create! valid_attributes
        put :update, params: {id: announcement.id, course_id: course.id, announcement: new_attributes}
        announcement.reload
        expect(announcement.body).to eq(new_attributes[:body])
      end

      it "returns updates group" do
        announcement = course.announcements.create! valid_attributes
        put :update, params: {id: announcement.id, course_id: course.id, announcement: valid_attributes}
        expect(response).to be_successful
      end
    end
  end

  describe "DELETE #destroy" do
    it "destroys the group" do
      announcement = course.announcements.create! valid_attributes
      expect {
        delete :destroy, params: {id: announcement.id, course_id: course.id}
      }.to change(Announcement, :count).by(-1)
    end
  end
end
