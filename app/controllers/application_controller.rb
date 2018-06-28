class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
	before_action :authenticate_user!, if: proc { request.controller_class.parent == Api }

  def render_error(model)
    render json: { errors: model.errors.full_messages.join(',')}, status: 422
  end
end
