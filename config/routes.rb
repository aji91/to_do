Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: "registrations",
    sessions: "sessions"
  }

  root to: 'application#angular'
  
  namespace :api do
    namespace :v1 do
    	resources :users, only: [:index, :destroy] do
    		collection do
    			get :check_current_user
    		end
        resources :projects
    	end
    end
  end
end
