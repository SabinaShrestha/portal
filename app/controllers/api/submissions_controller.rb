class Api::SubmissionsController < ApplicationController
  before_action :set_enrollment
  before_action :set_submission, only: [:show, :update, :destroy ]
  
  def index
    render json: @enrollment.submissions
  end

  def assignment_submissions
    render json: @enrollment.submissions.where(content_type == assignment)
  end
  
  def quiz_submissions
    render json: @enrollment.submissions.where(content_type == quiz)
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
    submission = @enrollment.submissions.new(submission_params)
    submission.date_submitted = DateTime.now
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
