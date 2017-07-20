define([
  'angular',
  'moment',
  'sdk',
  'angular-bootstrap'
], (angular, moment) => {
  angular
  .module('orders')
  .controller('OrderFormCtrl', (
    $scope,
    $rootScope,
    $stateParams,
    $window,
    $timeout,
    $uibModalInstance,
    Orders,
    order
  ) => {
    $scope.order = order || {};
    $scope.order.createdAt = moment() || order.createdAt;
    const clientId = $stateParams.id || null;
    if (clientId) {
      $scope.order.clientId = $stateParams.id;
    }
    $scope.close = () => {
      $uibModalInstance.close();
    };

    $scope.save = () => {
      let promise = Orders.save;
      if ($scope.orderForm.$valid) {
        $scope.loading = true;
        if (order !== null) {
          promise = Orders.update;
        }
        promise($scope.order).$promise
        .then((created) => {
          $scope.loading = false;
          $rootScope.$broadcast('UPDATE_TABLE');
          $scope.close();
        })
        .catch((error) => {
          $scope.loading = false;
          alert('Error saving order');
        });
      }
    };

  });
});
