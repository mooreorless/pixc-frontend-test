define([
  'angular',
  'angular-ui-router',
  'angular-resource',
  'oclazyload',
  'angular-bootstrap',
  // 'moduleHere'
  'sdk'
], (angular) => {

  const core = angular.module('core', [
    'ui.router',
    'ngResource',
    'oc.lazyLoad',
    'ui.bootstrap',
    'sdk'
  ]);

  core
  .config((
    $stateProvider,
    $urlRouterProvider
  ) => {
    $stateProvider
    .state('app', {
      abstract: true,
      views: {
        app: {
          templateUrl: './js/core/views/index.html'
        }
      }
    })
    .state('app.main', {
      abstract: true,
      views: {
        'navbar@app': {
          templateUrl: './js/core/templates/nav.tpl.html',
          controller: 'MainCtrl'
        }
      },
      resolve: {
        deps: $ocLazyLoad => $ocLazyLoad.load([
          './js/core/controllers/main.ctrl.js'
        ])
      }
    })
    .state('app.main.orders', {
      url: '/orders',
      views: {
        'content@app': {
          templateUrl: './js/core/views/orders/index.html'
        }
      }
    });

    $urlRouterProvider.otherwise('/orders');
  });

  return core;
});
