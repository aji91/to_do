angular.module('allUsers', ['ngResource','ngStorage']);
angular.module('allUsers')
.component('allUsers', {
  templateUrl: '/templates/admin/all_users.html',
  controller: ['$http', '$stateParams', '$state','$localStorage', 'homeService', 'Notification', 'UserServices', function SignupController($http, $stateParams, $state, $localStorage, $homeService, Notification, UserServices) {
    var self = this;
    $homeService.check_current_user().then(function(data) {
      if (data.status && data.user.role == 'Admin'){
        self.user_logged_in = true;
        UserServices.collection.query().$promise.then(function(response){
          self.users = response.data;
        });

        self.deleteUser = function(user){
          UserServices.member.destroy(user).$promise.then(function(response){
            if (response.success){
              Notification.success(response.msg);
              $state.reload();
            } else {
              Notification.warning(data.msg);
            }
          });
        };
      } else if (data.success){
        $state.go('projects', {user_id: data.user_id})
      } else {
        $state.go('homes')
      }
    });
  }]
});
