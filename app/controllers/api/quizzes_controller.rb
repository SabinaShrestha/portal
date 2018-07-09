class Api::QuizzesController < ApplicationController
  before_action :set_course
  before_action :set_quiz, only: [:show, :update, :destroy]

  # GET /quiz
  def index
    render json: @course.quizzes
  end

  # GET /quiz/1
  def show
    render json: @quiz
  end

  # POST /quiz
  def create
    quiz = @course.quizzes.new(quiz_params)
  
    if quiz.save
      render json: quiz
    else
      render_error(quiz)
    end
  end

  # PATCH/PUT /quiz/1
  def update
    if @quiz.update(quiz_params)
      render json: @quiz
    else
      render_error(@quiz)
    end
  end

  # DELETE /quiz/1
  def destroy
    @quiz.destroy
  end

  private

    def set_course
      @course = Course.find(params[:course_id])
    end

    def set_quiz
      @quiz = Quiz.find(params[:id])
    end

    def quiz_params
      params.require(:quiz).permit(
        :course_id,
        :name, 
        :quiz_type, 
        :points, 
        :multiple_attempts, 
        :shuffle, 
        :published, 
        :available_from,
        :available_until,
        :quiz_settings,
        :time_limit,
        :due_date
      )
    end
end
