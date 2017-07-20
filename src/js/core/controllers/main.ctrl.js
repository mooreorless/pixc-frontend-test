define([
  'angular',
  'sdk',
  'angular-bootstrap'
], (angular) => {
  angular
  .module('core')
  .controller('MainCtrl', (
    $scope,
    $rootScope,
    $window,
    $timeout,
    $uibModal,
    User
  ) => {
    $scope.welcome = 'Pixc Orders';

    function fetchUser() {
      return User.query().$promise
      .then((user) => {
        $scope.user = user[0];
      })
      .catch((error) => {
        alert('Cannot fetch user');
      });
    };

    $scope.editUser = (user) => {
      const modal = $uibModal.open({
        templateUrl: './js/core/templates/userForm.tpl.html',
        controller: 'UserFormCtrl',
        resolve: {
          loadUserForm: $ocLazyLoad => $ocLazyLoad.load([
            './js/core/controllers/userForm.ctrl.js',
            './js/sdk/models/user.factory.js'
          ]),
          user: user || null
        }
      });
      modal.result
      .then(() => {})
      .catch(error => console.log(error));
    };

    fetchUser();

    $rootScope.$on('UPDATE_USER', () => fetchUser());
  });
});
