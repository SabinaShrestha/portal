require 'rails_helper'

RSpec.describe Api::SubmissionsController, type: :controller do
  
  login_user
  let(:course) { FactoryBot.create(:course) }
  
  let(:valid_attributes){
      { grade_type: true,
        due_date: DateTime.now,
        sub_type: 'url',
        date_submitted: DateTime.now }
    }
    
    let(:invalid_attributes){
        { grade_type: false,
          due_date: nil,
          sub_type: '',
          date_submitted: nil }
      }
      
  describe "GET #index" do
    it "returns http success" do
      enrollment = FactoryBot.create(:enrollment, user: @user )
      get :index, params: { course_id: enrollment.course_id, enrollment_id: enrollment.id }
      expect(response).to be_successful
    end
  end
  
  describe "GET #show" do
    it "returns http success" do
      enrollment = FactoryBot.create(:enrollment, user: @user)
      submission = enrollment.submissions.create! valid_attributes
      get :show, params: { id: submission.id, enrollment_id: enrollment.id, course_id: course.id }
      expect(response).to be_successful
    end
  end
  
  describe "PUT #update" do
    context "with valid params" do
      let(:new_attributes){
        { grade_type: true,
          due_date: DateTime.now,
          sub_type: 'zip',
          date_submitted: DateTime.now }
        }
        it "updates submission attributes" do
          enrollment = FactoryBot.create(:enrollment, user: @user)
          submission = enrollment.submissions.create! valid_attributes
          put :update, params: {id: submission.id, enrollment_id: enrollment.id, course_id: course.id, submission: new_attributes}
          submission.reload
          expect(submission.sub_type).to eq(new_attributes[:sub_type])
        end
        
        it "returns updates submission" do
          enrollment = FactoryBot.create(:enrollment, user: @user)
          submission = enrollment.submissions.create! valid_attributes
          put :update, params: {id: submission.id, enrollment_id: enrollment.id, course_id: course.id, submission: valid_attributes}
          expect(response).to be_successful
        end
      end
      
      context "with invalid params" do
        it "does not update the submission sub_type" do
          enrollment = FactoryBot.create(:enrollment, user: @user)
          submission = enrollment.submissions.create! valid_attributes
          put :update, params: {id: submission.id, enrollment_id: enrollment.id, course_id: course.id, submission: invalid_attributes}
          submission.reload
          expect(submission).to_not eq(invalid_attributes)
        end
        
        it "returns an error" do
          enrollment = FactoryBot.create(:enrollment, user: @user)
          submission = enrollment.submissions.create! valid_attributes
          put :update, params: {id: submission.id, enrollment_id: enrollment.id, course_id: course.id, submission: invalid_attributes}
          expect(response).to have_http_status(422)
        end
      end
    end
    
    describe "POST #create" do
      context "with valid params" do
        it "create a new submission" do
          enrollment = FactoryBot.create(:enrollment, user: @user)
          expect {
            post :create, params: {enrollment_id: enrollment.id, course_id: course.id, submission: valid_attributes}
          }.to change(Submission, :count).by(1)
        end
        
        it "returns the created submission" do
          enrollment = FactoryBot.create(:enrollment, user: @user)
          post :create, params: {enrollment_id: enrollment.id, course_id: course.id, submission: valid_attributes}
          expect(response).to be_successful
        end
      end
      
      context "with invalid params" do
        it "does not create a submission" do
          enrollment = FactoryBot.create(:enrollment, user: @user)
          expect {
            post :create, params: {enrollment_id: enrollment.id, course_id: course.id, submission: invalid_attributes}
          }.to change(Submission, :count).by(0)
        end
        
        it "returns an error" do
          enrollment = FactoryBot.create(:enrollment, user: @user)
          post :create, params: {enrollment_id: enrollment.id, course_id: course.id, submission: invalid_attributes}
          expect(response).to have_http_status(422)
        end
      end
    end
    
    describe "GET #destroy" do
      it "destroys the submission" do
        enrollment = FactoryBot.create(:enrollment, user: @user)
        submission = enrollment.submissions.create! valid_attributes
        expect {
          delete :destroy, params: { id: submission.id, enrollment_id: enrollment.id, course_id: course.id }
        }.to change(Submission, :count).by(-1)
      end
    end
    
  end
  