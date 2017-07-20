define([
  'angular',
  'sdk',
  'angular-bootstrap'
], (angular) => {
  angular
  .module('core')
  .controller('UserFormCtrl', (
    $scope,
    $rootScope,
    $uibModalInstance,
    User,
    user
  ) => {
    $scope.user = user || {};
    $scope.close = () => {
      $uibModalInstance.close();
    };

    $scope.save = () => {
      if ($scope.userForm.$valid) {
        $scope.loading = true;
        return User.update({ id: user.id }, $scope.user).$promise
        .then((user) => {
          $scope.loading = false;
          $rootScope.$broadcast('UPDATE_USER');
          $scope.close();
        })
        .catch((error) => {
          $scope.loading = false;
          alert('Error updating user');
        });
      }
    };

  });
});
