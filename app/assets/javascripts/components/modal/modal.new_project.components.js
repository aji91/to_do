angular.module('modalNewProject', ['ngResource','ngStorage']);
angular.module('modalNewProject')
.component('modalNewProject', {
  templateUrl: '/templates/modal/new_project.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: ['$http', '$stateParams', '$state','$localStorage', 'homeService', 'ProjectServices', '$uibModal', 'Notification', function ProjectsController($http, $stateParams, $state, $localStorage, $homeService, ProjectServices, $uibModal, Notification) {
    var self = this;
    self.$onInit = function () {
      self.user_id = self.resolve.user_id;
      self.project = {
        user_id: self.user_id
      };
    };

    self.createProject = function(){
      ProjectServices.collection.create(self.project).$promise.then(function(response){
        if (response.success){
          Notification.success(response.msg);
          self.dismiss({$value: 'created'});
        } else {
          Notification.warning(data.msg);
        }
      });
    };

    self.$onChange = function () {

    };

    self.ok = function () {

    };

    self.cancel = function () {
      self.dismiss({$value: 'cancel'});
    };
  }]
});
