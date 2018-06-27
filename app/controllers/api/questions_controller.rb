class Api::QuestionsController < ApplicationController
  before_action :set_quiz
  before_action :set_question, only:[:create, :update, :destroy, :show]
  def index
    render json: @quiz.question
  end

  def show
    render json: @question
  end

  def create
    question = quiz.question.new(question_params)
    if question.save
      render json: question
    else
      render error: { errors: question.errors }, status: 422
    end
  end

  def update
    if question.update(question_params)
      render json: @question
    else
      render error: { errors: question.errors }, status: 422
    end
  end

  def destroy
    @question.destroy
    render json: { message: 'Question has been deleted' }
  end

  private
    
    def set_quiz
      @quiz = Quiz.find(parmas[:quiz_id])
    end

    def set_question
      @question = Question.find(params[:id])
    end
    
    def question_params
      params.require(:question).permit(:quiz_id, :answer_type, :points, :body, :question_data)
    end
end
