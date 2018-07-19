class Api::EnrollmentsController < ApplicationController
  before_action :set_course
  before_action :set_enrollment, only: [:update, :destroy]

  def index
    render json: Enrollment.course_enrollments(@course.id)
  end

  def update
    if @enrollment.update(enrollment_params)
      render json: @enrollment
    else
      render_error(@enrollment)
    end
  end

  def destroy
    @enrollment.destroy
  end

  def get_students
    render json: Enrollment.students(@course.id)
  end

  private

  def set_course
    @course = Course.find(params[:course_id])
  end

  def set_enrollment
    @enrollment = Enrollment.find(params[:id])
  end

  def enrollment_params
    params.require(:enrollment).permit(:role)
  end

end
