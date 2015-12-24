import _ from 'lodash';

class SearchController {
  constructor($scope, $routeParams, $location, ItemsService, CartService) {
    this.$scope = $scope;
    this.ItemsService = ItemsService;
    this.CartService = CartService;
    this.$scope.items = [];
    this.$scope.filter = {};

    let dfd = this.ItemsService.getItems();
    dfd.then(resp => {
      this.$scope.items = resp.data.items;
    });
  }

  addToCart(item) {
    let dfd = this.CartService.addItem(item);

    dfd.then(items => {

    }, err => {

      alert(err.msg);
    });
  }
}

SearchController.$inject = ['$scope', '$routeParams', '$location', 'ItemsService', 'CartService'];
export default SearchController;
