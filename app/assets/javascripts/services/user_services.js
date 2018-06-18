angular.module('allUsers')
.factory('UserServices', ['$resource',function($resource) {
  return {
    collection: $resource('/api/v1/users', {}, {
      query: { method: 'GET' }
    }),
    member: $resource('/api/v1/users/:id', {}, {
      destroy: { method: 'DELETE', params: {id: '@id'} },
    })
  };
}]);