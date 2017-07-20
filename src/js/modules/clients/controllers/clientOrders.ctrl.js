define([
  'angular',
  'jquery',
  'moment',
  'angular-bootstrap',
  'sdk'
], (angular, $, moment) => {
  angular
  .module('core')
  .controller('ClientOrdersCtrl', (
    $scope,
    $rootScope,
    $state,
    $stateParams,
    $window,
    $timeout,
    $uibModal,
    $ocLazyLoad,
    Orders,
    clientOrders
  ) => {
    $scope.getOrders = (data, cb, settings) => {
      cb({ data: clientOrders });
    };

    $scope.orderCols = [{
      name: 'Client',
      data(row) {
        return row.name;
      },
      defaultContent: '-'
    }, {
      name: 'Weight (kg)',
      data(row) {
        return row.weight;
      },
      defaultContent: '-'
    }, {
      name: 'Destination',
      data(row) {
        return row.destination;
      },
      defaultContent: '-'
    }, {
      name: 'Order Placed',
      data(row) {
        return moment(row.createdAt).format('MMMM Do YYYY');
      },
      defaultContent: '-'
    }, {
      className: 'editOrder center',
      orderable: false,
      width: '5%',
      data(row) {
        if (row.id) {
          return `
            <a class="btn btn-info btn-small"><i class="glyphicon glyphicon-pencil"></i></a>
          `;
        }
      }
    }, {
      className: 'deleteOrder center',
      orderable: false,
      width: '5%',
      data(row) {
        if (row.id) {
          return `
            <a class="btn btn-danger btn-small"><i class="glyphicon glyphicon-remove"></i></a>
          `;
        }
      }
    }];

    $scope.createOrder = (order) => {
      const modal = $uibModal.open({
        templateUrl: './js/modules/orders/templates/orderForm.tpl.html',
        controller: 'OrderFormCtrl',
        resolve: {
          loadOrderForm: $ocLazyLoad => $ocLazyLoad.load([
            './js/modules/orders/controllers/orderForm.ctrl.js',
            './js/sdk/models/orders.factory.js'
          ]),
          order: order || null
        }
      });
      modal.result
      .then(() => {})
      .catch(error => console.log(error));
    };

    $scope.deleteOrder = (id) => {
      return Orders.delete({ id }).$promise
      .then(() => {
        $rootScope.$broadcast('UPDATE_TABLE');
        alert(`Order ${id} deleted`);
      })
      .catch((error) => console.log(error));
    };

    $('#orderList').on('mouseup', 'td.editOrder', function () {
      let tr = $(this).closest('tr');
      let rowData = $scope.orderList.row(tr).data();
      
      $scope.createOrder(rowData);
    });

    $('#orderList').on('mouseup', 'td.deleteOrder', function () {
      let tr = $(this).closest('tr');
      let rowData = $scope.orderList.row(tr).data();

      $scope.deleteOrder(rowData.id);
    });

    $scope.orderTableOpts = {
      pageLength: 10,
      pagingType: 'simple',
      searching: false,
      order: [['0', 'desc']]
    };
  });
});
