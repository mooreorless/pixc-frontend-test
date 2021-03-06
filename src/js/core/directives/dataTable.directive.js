define([
  'angular',
  'jquery',
  'lodash',
  'datatables.net'
], (angular, $, _) => {
  angular
  .module('core')
  .directive('pixcDataTable', $rootScope => ({
    restrict: 'AE',
    template: `<table class="table table-striped table-hover dt-left">
    <thead></thead></table>`,
    replace: true,
    scope: {
      src: '&',
      cols: '=',
      rowHover: '&?',
      table: '=?',
      options: '=?'
    },
    link(scope, elem) {
      let options = {
        autoWidth: false,
        ajax(data, callback, settings) {
          scope.src({
            data,
            cb(source) {
              return callback(source);
            },
            settings
          });
        },
        columns: _.map(scope.cols, (col) => {
          col.title = col.title || col.name;
          return col;
        })
      };
      scope.options = scope.options || {};
      options = _.defaults(options, scope.options);
      scope.table = $(elem).DataTable(options);

      $rootScope.$on('UPDATE_TABLE', () => {
        scope.table.ajax.reload();
      });
    }
  }));
});
