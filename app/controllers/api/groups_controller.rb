class Api::GroupsController < ApplicationController
  before_action :set_course
  before_action :set_group, only: [:update, :destroy, :show]

  def create
    group = @course.groups.create(group_params)
    if group.save
      render json: group
    else
      render_error(group)
    end
  end

  def update
    if @group.update(group_params)
      render json: @group
    else
      render_error(@group)
    end
  end

  def destroy
    @group.destroy
  end

  def index
    render json: Group.all
  end

  def show
    render json: @group
  end


  private
    def group_params
      params.require(:group).permit(:name)
    end

    def set_course
      @course = Course.find(params[:course_id])
    end

    def set_group
      @group = Group.find(params[:id])
    end
end
