define([
  'angular',
  'sdk'
], (angular) => {
  angular
  .module('sdk')
  .factory('User', (
    $resource,
    $apiEndpoint
  ) => {
    const url = `${$apiEndpoint}/users/:id`;
    const User = $resource(url, {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    return User;
  });
});
