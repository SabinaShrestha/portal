class Api::CoursesController < ApplicationController
  before_action :set_course, only: [:show, :update, :destroy, :copy_course]

  def index
    if current_user.is_admin
      render json: Course.active
    else
      render json: Course.active_with_enrollments(current_user.id)
    end
  end

  def copy_course
    render json: Course.copy_course(@course, params[:course])
  end

  def show
  end

  def create
    if current_user.is_admin
      course = Course.new(course_params)
      if course.save
        render json: course
      else
        render_error(course)
      end
    end
  end

  def update
    if @course.update(course_params)
      render json: @course
    else
      render_error(@course)
    end
  end

  def destroy
    @course.destroy
  end

  private

   def set_course
     @course = Course.find(params[:id])
   end
  
   def course_params
    params.require(:course).permit(:name, :description, :time_zone, :department, :starts, :ends, :lock_after_end, :lock_before_start, :course_home, :published, :concluded)
   end
end
