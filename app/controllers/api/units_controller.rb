class Api::UnitsController < ApplicationController
  before_action :set_course 
  before_action :set_unit, only: [:show, :update, :destroy]

  # GET /units
  def index
    render json: @course.units 
  end

  # GET /units/1
  def show
    render json: @unit
  end

  # POST /units
  def create
    unit = @course.units.new(unit_params)

    if unit.save
      render json: unit
    else
      render_error(unit)
    end
  end

  # PATCH/PUT /units/1
  def update
    if @unit.update(unit_params)
      render json: @unit
    else
      render_error(@unit)
    end
  end

  # DELETE /units/1
  def destroy
    @unit.destroy
  end

  private

    def set_course
      @course = Course.find(params[:course_id])
    end
    
    def set_unit
      @unit = Unit.find(params[:id])
    end

    def unit_params
      params.require(:unit).permit(:course_id, :name, :position)
    end
end


