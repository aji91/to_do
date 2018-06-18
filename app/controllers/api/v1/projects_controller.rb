class Api::V1::ProjectsController < Api::V1::BaseController
  before_action :authenticate_user!
  before_action :find_project, only: [:destroy, :update]

  def index
    projects = @user.projects
    render json: { data: JSON.parse(projects.to_json) }
  end

  def create
    project = @user.projects.new(project_params)
    if project.save
      render json: { success: true, msg: "Project successfully created." }
    else
      render json: { success: false, msg: project.errors.full_messages[0] }
    end
  end

  def destroy
    if @project.destroy.destroyed?
      render json: { success: true, msg: "Project successfully deleted." }
    else
      render json: { success: false, msg: "Project not deleted." }
    end
  end

  def update
    if @project.update_attributes(project_params)
      render json: { success: true, msg: "Project status updated." }
    else
      render json: { success: false, msg: "Project status not updated." }
    end
  end

  private

  def find_project
    @project = @user.projects.find_by_id(params[:id])
  end

  def project_params
  	params.require(:project).permit(:name, :status)
  end
end
