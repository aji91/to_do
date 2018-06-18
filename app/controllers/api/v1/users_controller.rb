class Api::V1::UsersController < Api::V1::BaseController
  before_action :authenticate_user!, except: [:check_current_user]

  def index
    users = User.where.not(id: @user.id)
    render json: { success: true, data: JSON.parse(users.to_json) }
  end

  def destroy
    user = User.find_by_id(params[:id])
    if user.destroy.destroyed?
      render json: { success: true, msg: 'User successfully deleted' }
    else
      render json: { success: false, msg: 'User not deleted' }
    end
  end

  def check_current_user
    if @user.present?
      render json: {
                 status: true,
                 user: JSON.parse(@user.to_json),
                 user_id: @user.id,
             }
    else
      render json: { status: false, msg: 'Please login to continue.' }
    end
  end
end
