class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  after_action :set_csrf_cookie

  # before_action :configure_permitted_parameters, if: :devise_controller?
  respond_to :html, :json, :js

  def angular
    render 'layouts/application'
  end

  def set_csrf_cookie
    if protect_against_forgery?
      response.headers['X-CSRF-Param'] = "#{request_forgery_protection_token}"
      response.headers['X-CSRF-Token'] = "#{form_authenticity_token}"
    end
  end
end
