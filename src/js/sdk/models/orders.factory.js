define([
  'angular',
  'sdk'
], (angular) => {
  angular
  .module('sdk')
  .factory('Orders', (
    $resource,
    $apiEndpoint
  ) => {
    const url = `${$apiEndpoint}/orders/:id`;
    const Orders = $resource(url, {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    return Orders;
  });
});
