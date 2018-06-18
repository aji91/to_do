angular.module('projects')
.factory('ProjectServices', ['$resource',function($resource) {
  return {
    collection: $resource('/api/v1/users/:id/projects', {}, {
      query: { method: 'GET' },
      create: { method: 'POST', params: {id: '@user_id'} }
    }),
    member: $resource('/api/v1/users/:user_id/projects/:id', {}, {
      destroy: { method: 'DELETE', params: {user_id: '@user_id', id: '@id'} },
      update: { method: 'PUT', params: {user_id: '@user_id', id: '@id'} }
    })
  };
}]);