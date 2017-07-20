define([
  'angular',
  'angular-ui-router',
  'oclazyload',
  'sdk',
  './js/sdk/models/clients.factory.js'
], (angular) => {
  const clients = angular.module('clients', [
    'oc.lazyLoad',
    'ui.router',
    'sdk'
  ]);

  clients.config(($stateProvider) => {
    $stateProvider
    .state('app.main.clients', {
      url: '/clients',
      views: {
        'content@app': {
          templateUrl: './js/modules/clients/views/index.html',
          controller: 'ClientCtrl'
        }
      },
      resolve: {
        deps: $ocLazyLoad => $ocLazyLoad.load([
          './js/modules/clients/controllers/clients.ctrl.js',
          './js/sdk/models/clients.factory.js',
          './js/core/directives/dataTable.directive.js'
        ])
      }
    })
    .state('app.main.clients.details', {
      url: '/:id',
      views: {
        'content@app': {
          templateUrl: './js/modules/clients/views/clientOrders.html',
          controller: 'ClientOrdersCtrl'
        }
      },
      resolve: {
        deps: $ocLazyLoad => $ocLazyLoad.load([
          './js/modules/clients/controllers/clientOrders.ctrl.js',
          './js/sdk/models/orders.factory.js',
          './js/sdk/models/clients.factory.js',
          './js/core/directives/dataTable.directive.js'
        ]),
        clientOrders: ($stateParams, Clients) => {
          const clientId = $stateParams.id;
          return Clients.getOrders({ id: clientId }).$promise
          .then((clientOrders) => {
            return clientOrders;
          })
          .catch((error) => console.log('Error fetching client orders'));
        }
      }
    });
  });

  return clients;
});
