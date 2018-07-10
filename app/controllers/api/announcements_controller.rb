class Api::AnnouncementsController < ApplicationController
  before_action :set_course
  before_action :set_announcement, only: [:show, :update, :destroy]

  def index
    render json: @course.announcements
  end

  def show
    render json: @announcement
  end

  def create
    announcement = @course.announcements.create(announcement_params)
    if announcement.save
      render json: announcement
    else
      render_error(announcement)
    end
  end

  def update
    if @announcement.update(announcement_params)
      render json: @announcement
    else
      render_error(@announcement)
    end
  end

  def destroy
    @announcement.destroy
  end

  private

  def set_course
    @course = Course.find(params[:course_id])
  end

  def set_announcement
    @announcement = Announcement.find(params[:id])
  end

  def announcement_params
    params.require(:announcement).permit(
      :course_id,
      :announcement_id,
      :body,
      :publish_at,
      :published
      )
  end
end
