class Api::AssignmentsController < ApplicationController
  before_action :set_course
  before_action :set_assignment, only: [:show, :update, :destroy]

  def index
    render json: @course.assignments 
  end

  def show
    render json: @assignment
  end

  def create
    assignment = @course.assignments.new(assignment_params)

    if assignment.save
      render json: assignment
    else
      render_error(assignment)
    end
  end

  def update
    if @assignment.update(assignment_params)
      render json: @assignment
    else
      render_error(@assignment)
    end
  end

  def destroy
    @assignment.destroy
  end

  private

  def set_course
    @course = Course.find(params[:course_id])
  end

  def set_assignment
    @assignment = Assignment.find(params[:id])
  end

  def assignment_params
    params.require(:assignment).permit(
      :course_id,
      :grading_group_id,
      :title,
      :description,
      :due_date,
      :points,
      :published,
      :submission_type,
      :grade_type,
      :unlocks_at,
      :locks_at)
  end
end

