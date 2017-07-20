define([
  'angular',
  'jquery',
  'angular-bootstrap',
  'sdk'
], (angular, $) => {
  angular
  .module('core')
  .controller('ClientCtrl', (
    $scope,
    $state,
    $window,
    $timeout,
    $uibModal,
    $ocLazyLoad,
    Clients
  ) => {
    $scope.getClients = (data, cb, settings) => {
      return Clients.query().$promise
      .then((clients) => {
        cb({ data: clients });
      });
    };

    $scope.clientCols = [{
      name: 'Client',
      data(row) {
        return `${row.firstName} ${row.lastName || ''}`;
      },
      defaultContent: '-'
    }, {
      name: 'Address',
      data(row) {
        if (row.address) {
          return row.address;
        }
        return 'No address provided';
      },
      defaultContent: '-'
    }, {
      name: 'Email',
      data(row) {
        if (row.email) {
          return row.email;
        }
        return 'No email provided';
      },
      defaultContent: '-'
    }, {
      className: 'viewOrders center',
      orderable: false,
      width: '15%',
      data(row) {
        if (row.id) {
          return `
            <a class="btn btn-warning btn-small"> View Orders</a>
          `;
        }
      }
    }];

    $('#clientList').on('mouseup', 'td.viewOrders', function () {
      let tr = $(this).closest('tr');
      let rowData = $scope.clientList.row(tr).data();

      $scope.viewOrders(rowData);
    });


    $scope.viewOrders = (client) => $state.go('app.main.clients.details', { id: client.id });

    $scope.clientTableOpts = {
      pageLength: 10,
      pagingType: 'simple',
      searching: false,
      order: [['0', 'desc']]
    };
  });
});
