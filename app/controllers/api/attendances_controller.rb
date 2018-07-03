class Api::AttendancesController < ApplicationController
  before_action :set_enrollment, except: [:destroy]
  before_action :set_attendance, only: [:show, :update, :destroy]
  
  def index
    render json: @enrollment.attendances
  end

  def show
    render json: @attendance
  end

  def create
    attendance = Attendance.new(attendance_params)
    if attendance.save
      render json: attendance
    else
      render json: attendance.errors
    end
  end

  def update
    if @attendance.update(attendance_params)
      render json: @attendance
    else
      render json: @attendance.errors
    end
  end

  def destroy
    @attendance.destroy
  end

  private
    def set_attendance
      @attendance = Attendance.find(params[:id])
    end 

    def set_enrollment
      @enrollment = Enrollment.find(params[:enrollment_id])
    end

    def attendance_params
      params.require(:attendance).permit(
        :present,
        :absent,
        :tardy,
        :tardy_time,
        :total_attendance,
        :excused,
        :reason,
        :date,
        :badge,
        :course_id,
        :enrollment_id,
      )
    end

end
