class Api::CourseNavsController < ApplicationController
  before_action :set_course

  def index
    render json: @course.course_navs.order(:priority)
  end

  def update_course_navs
    CourseNav.update_position(params[:navs])
  end

  private
    def set_course
      @course = Course.find(params[:course_id])
    end

end
