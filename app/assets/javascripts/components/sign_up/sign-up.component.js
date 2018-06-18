angular.module('signUp', ['ngResource','ngStorage']);
angular.module('signUp')
.component('signUp', {
  templateUrl: '/templates/sign_up/index.html',
  controller: ['$http', '$stateParams', '$state','$localStorage', 'homeService', 'Notification', function SignupController($http, $stateParams, $state, $localStorage, $homeService, Notification) {
    var self = this;
    $homeService.check_current_user().then(function(data) {
      if (data.status){
        $state.go('projects', {user_id: data.user_id})
      } else {
        self.user = {};
        self.registerUser = function(){
          $homeService.user_registration(self.user).then(function(data) {
            if(data.success){
              Notification.success(data.msg);
              if (data.user.role == 'Admin')
                $state.go('all_users');
              else
                $state.go('projects');
            } else {
              Notification.warning(data.msg);
            }
          });
        };
      }
    });
  }]
});
