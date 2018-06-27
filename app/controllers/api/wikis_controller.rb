class Api::WikisController < ApplicationController
  before_action :set_course 
  before_action :set_wiki, only: [:show, :update, :destroy]

  # GET /wikis
  def index
    render json: @course.wikis 
  end

  # GET /wikis/1
  def show
    render json: @wiki
  end

  # POST /wikis
  def create
    wiki = @course.wikis.new(wiki_params)

    if wiki.save
      render json: wiki
    else
      render_error(wiki)
    end
  end

  # PATCH/PUT /wikis/1
  def update
    if @wiki.update(wiki_params)
      render json: @wiki
    else
      render_error(@wiki)
    end
  end

  # DELETE /wikis/1
  def destroy
    @wiki.destroy
  end

  private

    def set_course
      @course = Course.find(params[:course_id])
    end
    
    def set_wiki
      @wiki = Wiki.find(params[:id])
    end

    def wiki_params
      params.require(:wiki).permit(
        :course_id,
        :pinned,
        :public,
        :published,
        :publish_at,
        :wiki_type,
        :title,
        :body,)
    end
end


