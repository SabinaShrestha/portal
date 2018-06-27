class Api::UnitItemsController < ApplicationController
  before_action :set_unit
  before_action :set_unit_items, only: [:show, :update, :destroy]

  def index
    render json: @unit.unit_items
  end

  def show
    render json: @unit_items
  end

  def create
    unit_items = @unit.unit_items.new(unit_items_params)

    if unit_items.save
      render json: unit_items
    else
      render_error(unit_items)
    end
  end

  def update
    if @unit_items.update(unit_items_params)
      render json: @unit_items
    else
      render_error(@unit_items)
    end
  end

  def destroy
    @unit_items.destroy
  end

  private

    def set_unit
      @unit = Unit.find(params[:unit_id])
    end

    def set_unit_items
      @unit_items = Unit_items.find(params[:id])
    end

    def unit_items_params
      params.require(:unit_items).permit(
        :unit_id,
        :item_type, 
        :item_id,  
      )
    end
end
