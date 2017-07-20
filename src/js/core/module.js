define([
  'angular',
  'angular-ui-router',
  'angular-resource',
  'oclazyload',
  'angular-bootstrap',
  'orders',
  'clients',
  'sdk'
], (angular) => {

  const core = angular.module('core', [
    'ui.router',
    'ngResource',
    'oc.lazyLoad',
    'ui.bootstrap',
    'orders',
    'clients',
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
          './js/core/controllers/main.ctrl.js',
          './js/sdk/models/user.factory.js'
        ])
      }
    });

    $urlRouterProvider.otherwise('/clients');
  });

  return core;
});
