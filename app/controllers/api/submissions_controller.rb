class Api::SubmissionsController < ApplicationController
  before_action :set_submission, only: [:show, :update, :destroy]
  before_action :set_enrollment
  
  def index
    render json: @enrollment.submissions
  end

  def show
    render json: @submission
  end

  def update
    if @submission.update(submission_params)
      render json: @submission
    else
      render_error(@submission)
    end
  end

  def create
    submission = @enrollment.submissions.create(submission_params)
    if submission.save
      render json: submission
    else
      render_error(submission)
    end
  end

  def destroy
    @submission.destroy
  end

  private
    def set_submission
      @submission = Submission.find(params[:id])
    end

    def set_enrollment
      @enrollment = Enrollment.find(params[:enrollment_id])
    end

    def submission_params
      params.require(:submission).permit(:due_date, :date_submitted, :grade_type, :sub_type)
    end
end
