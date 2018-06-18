'use strict';
var ApiService = angular.module('ApiService', []);

ApiService.factory('homeService', ["$http", "$window", "$q", "$rootScope", function($http, $window, $q, $rootScope) {
  return {
    user_registration: function(data){
      return $http.post('/users.json', { user: data }).then(function(data){
        return data.data;
      });
    },
    user_session: function(data){
      return $http.post('/users/sign_in.json',{user: data}).then(function(data){
        return data.data;
      });
    },
    check_current_user: function(data){
      return $http.get('/api/v1/users/check_current_user.json').then(function(data){
        return data.data;
      });
    }
  };
}]);
