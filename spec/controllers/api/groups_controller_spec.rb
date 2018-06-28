require 'rails_helper'

RSpec.describe Api::GroupsController, type: :controller do
  login_user
  let(:course) { FactoryBot.create(:course) }

  let(:valid_attributes){
      {name: 'Portal2'}
    }

    let(:invalid_attributes){
      {name: ''}
    }

    describe "POST #create" do
      context "with valid params" do
        it "create a new group" do
          expect {
            post :create, params: { course_id: course.id, group: valid_attributes }
          }.to change(Group, :count).by(1)
        end

        it "returns the created group" do
          post :create, params: { course_id: course.id, group: valid_attributes}
          expect(response).to be_successful
        end
      end

      context "with invalid params" do
        it "does not create a group" do
          expect {
            post :create, params: { course_id: course.id, group: invalid_attributes}
          }.to change(Group, :count).by(0)
        end

        it "returns an error" do
          post :create, params: {course_id: course.id, group: invalid_attributes}
          expect(response).to have_http_status(422)
        end
      end

    end

    describe "PUT #update" do
      context "with valid params" do
        let(:new_attributes){
          {name: "Portal3"}
        }
        it "updates group name" do
          group = course.groups.create! valid_attributes
          put :update, params: {id: group.id, course_id: course.id, group: new_attributes}
          group.reload
          expect(group.name).to eq(new_attributes[:name])
        end

        it "returns updates group" do
          group = course.groups.create! valid_attributes
          put :update, params: {id: group.id, course_id: course.id, group: valid_attributes}
          expect(response).to be_successful
        end
      end

      context "with invalid params" do
        it 'does not update the group name' do
          group = course.groups.create! valid_attributes
          put :update, params: {id: group.id, course_id: course.id, group: invalid_attributes}
          group.reload
          expect(group.name).to_not eq(invalid_attributes[:name])
        end

        it "returns an error" do
          group = course.groups.create! valid_attributes
          put :update, params: {id: group.id, course_id: course.id, group: invalid_attributes}
          expect(response).to have_http_status(422)
        end
      end
    end

    describe "DELETE #destroy" do
      it "destroys the group" do
        group = course.groups.create! valid_attributes
        expect {
          delete :destroy, params: {id: group.id, course_id: course.id}
        }.to change(Group, :count).by(-1)
      end
    end

    describe "GET #index" do
      it "returns http success" do
        get :index, params: { course_id: course.id }
        expect(response).to be_successful
      end
    end

    describe "GET #show" do
      it "returns http success" do
        group = course.groups.create! valid_attributes
        get :show, params: {id: group.id, course_id: course.id}
        expect(response).to be_successful
      end
    end

  end
