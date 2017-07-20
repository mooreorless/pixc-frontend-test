define([
  'angular',
  'sdk'
], (angular) => {
  angular
  .module('sdk')
  .factory('Clients', (
    $resource,
    $apiEndpoint
  ) => {
    const url = `${$apiEndpoint}/clients`;
    const Clients = $resource(url, {
      id: '@id'
    }, {
      getOrders: {
        url: `${$apiEndpoint}/clients/:id/orders`,
        isArray: true,
        params: {
          id: '@id'
        }
      }
    });

    // Update their details

    return Clients;
  });
});
