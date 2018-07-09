class Api::EnrollmentsController < ApplicationController
  
  before_action :set_course

  def get_students
    render json: Enrollment.students(@course.id)
  end

  private

  def set_course
    @course = Course.find(params[:course_id])
  end

end
