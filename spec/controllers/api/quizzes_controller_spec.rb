require 'rails_helper'

RSpec.describe Api::QuizzesController, type: :controller do
  login_user
  let(:course) { FactoryBot.create(:course) }
  let(:quiz) { FactoryBot.create(:quiz) }
  let(:valid_params) { FactoryBot.attributes_for(:quiz) }
  
  # GET /api/courses/:course_id/quizzes
  describe "GET #index" do
  it "returns JSON index" do
    get :index, params: { course_id: course.id }
    expect(response).to be_successful
  end
end

# GET /api/courses/:course_id/quizzes/id
describe "GET #show" do
it "returns JSON success" do
  get :show, params: { course_id: course.id, id: quiz.id }
  expect(response).to be_successful
end
end

# POST /api/courses/:course_id/quizzes
describe "POST #create" do
it "creates a new quiz" do
  expect {
    post :create, params: { course_id: course.id, quiz: valid_params }
  }.to change(Quiz, :count).by(1)
end
end

describe "PUT #update" do 
  context "with valid params"
    let(:new_params) { 
      {name: "Even more super hard", quiz_type:"Super-dooper Hard"} 
    }
    it "updates with valid params" do 
      put :update, params: { course_id: course.id, quiz: new_params }
      quiz.reload
      expect(quiz.name).to eq(new_params(:name, :quiz_type))
    end
  end

  # describe "DELETE #destroy" do 
  # end

end

# describe "PUT #update" do
#     let(:new_attributes) {
#       {  amount: 220 }
#     }

#     context "with valid params" do
#       it "updates the requested bank account" do
#         bank_account = @user.bank_accounts.create! valid_attributes
#         put :update, params: { id: bank_account.id, bank_account: new_attributes }
#         bank_account.reload
#         expect(bank_account.amount).to eq(new_attributes[:amount])
#       end


#       it "redirects to the bank_account" do
#         bank_account = @user.bank_accounts.create! valid_attributes
#         put :update, params: { id: bank_account.id, bank_account: new_attributes }
#         expect(response).to redirect_to(bank_account)
#       end
#     end

#     context "with invalid params" do
#       it 'does not update the bank account' do
#         bank_account = @user.bank_accounts.create! valid_attributes
#         put :update, params: { id: bank_account.id, bank_account: invalid_attributes }
#         bank_account.reload
#         expect(bank_account.institution).to_not eq(invalid_attributes[:institution])
#       end

#       it 'returns a success (edit template)' do
#         bank_account = @user.bank_accounts.create! valid_attributes
#         put :update, params: { id: bank_account.id, bank_account: invalid_attributes }
#         expect(response).to be_successful
#       end
#     end
#   end
