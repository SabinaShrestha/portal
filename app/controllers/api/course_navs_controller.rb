class Api::CourseNavsController < ApplicationController
  before_action :set_course

  def index
    render json: @course.course_navs.order(:priority)
  end

  private
    def set_course
      @course = Course.find(params[:course_id])
    end
end
