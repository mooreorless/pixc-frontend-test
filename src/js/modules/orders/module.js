define([
  'angular',
  'angular-ui-router',
  'oclazyload',
  'sdk'
], (angular) => {
  const orders = angular.module('orders', [
    'oc.lazyLoad',
    'ui.router',
    'sdk'
  ]);

  orders.config(($stateProvider) => {
    $stateProvider
    .state('app.main.orders', {
      url: '/orders',
      views: {
        'content@app': {
          templateUrl: './js/modules/orders/views/index.html',
          controller: 'OrdersCtrl'
        }
      },
      resolve: {
        deps: $ocLazyLoad => $ocLazyLoad.load([
          './js/modules/orders/controllers/orders.ctrl.js',
          './js/sdk/models/orders.factory.js',
          './js/core/directives/dataTable.directive.js'
        ])
      }
    });
  });

  return orders;
});
