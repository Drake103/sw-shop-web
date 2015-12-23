import _ from 'lodash';

class SearchController {
  constructor($scope, $routeParams, $location, ItemsService) {
    this.$scope = $scope;
    this.ItemsService = ItemsService;
    this.$scope.items = [];

    let dfd = this.ItemsService.getItems();
    dfd.then(resp => {
      this.$scope.items = resp.data.items;
    });
  }
}

SearchController.$inject = ['$scope', '$routeParams', '$location', 'ItemsService'];
export default SearchController;
