angular.module('projects', ['ngResource','ngStorage']);
angular.module('projects')
.component('projects', {
  templateUrl: '/templates/projects/index.html',
  controller: ['$http', '$stateParams', '$state','$localStorage', 'homeService', 'ProjectServices', '$uibModal', 'Notification', function ProjectsController($http, $stateParams, $state, $localStorage, $homeService, ProjectServices, $uibModal, Notification) {
    var self = this;
    $homeService.check_current_user().then(function(data) {
      if (data.status && data.user.role == 'Admin'){
        $state.go('all_users', {user_id: data.user_id});
      } else if (data.status){
        $localStorage.user_id = data.user_id;
      	self.user_logged_in = true;
        ProjectServices.collection.query({id: $localStorage.user_id}).$promise.then(function(response){
          self.projects = response.data;
        });

        self.newProject = function(){
          var modalInstance = $uibModal.open({
              animation: true,
              component: 'modalNewProject',
              size: '',
              resolve: {
                user_id: function(){ return $localStorage.user_id }
              }
            });

            modalInstance.result.then(function (selectedItem) {}, function (selectedItem) {
              if (selectedItem == 'created')
                $state.reload();
            });
        };

        self.deleteProject = function(project){
          ProjectServices.member.destroy(project).$promise.then(function(response){
            if (response.success){
              Notification.success(response.msg);
              $state.reload();
            } else {
              Notification.warning(data.msg);
            }
          });
        };

        self.updateProject = function(project){
          project.status = 'closed';
          ProjectServices.member.update(project).$promise.then(function(response){
            if (response.success){
              Notification.success(response.msg);
              $state.reload();
            } else {
              Notification.warning(data.msg);
            }
          });
        };
      } else {
        $state.go('homes');
      }
  	});
  }]
});
