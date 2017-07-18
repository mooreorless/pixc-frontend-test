define([
  'angular'
], (angular) => {
  angular
  .module('core')
  .controller('MainCtrl', (
    $scope,
    $window
  ) => {
    $scope.welcome = 'Pixc Orders';
  });
});
