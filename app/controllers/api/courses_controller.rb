class Api::CoursesController < ApplicationController

  def index
    if current_user.is_admin
      render json: Course.active
    else
      render json: Course.active_with_enrollments(current_user.id)
    end
  end

  def show
  end

  def create
    if current_user.is_admin
      course = Course.new(course_params)
      if course.save
        render json: course
      else
        render json: { errors: course.errors.full_messages }, status: 422
      end
    end
  end

  def update
  end

  def destroy
  end

  private
  
   def course_params
    params.require(:course).permit(:name, :description, :time_zone, :department, :starts, :ends, :lock_after_end, :lock_before_start, :course_home, :published, :concluded)
   end
end
