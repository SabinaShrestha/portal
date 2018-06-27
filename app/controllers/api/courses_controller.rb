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
  end

  def update
  end

  def destroy
  end
end
