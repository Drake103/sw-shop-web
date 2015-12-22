import _ from 'lodash';

class SearchController {
  constructor($scope, $routeParams, $location, ItemsService) {
    this.$scope = $scope;
    this.ItemsService = ItemsService;
  }
}

SearchController.$inject = ['$scope', '$routeParams', '$location', 'ItemsService'];
export default SearchController;
