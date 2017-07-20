define([
  'angular',
  'angular-resource'
], (angular) => {
  const sdk = angular.module('sdk', [
    'ngResource'
  ]);

  sdk.constant('$apiEndpoint', 'http://localhost:3000');

  return sdk;
});
