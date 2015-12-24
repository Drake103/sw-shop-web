import _ from 'lodash';

class SearchController {
  constructor($scope, $routeParams, $location, ItemsService, CartService, DictionaryService) {
    this.$scope = $scope;
    this.ItemsService = ItemsService;
    this.CartService = CartService;
    this.DictionaryService = DictionaryService;

    this.$scope.items = [];
    this.$scope.filter = {
      dateFrom: null,
      dateTo: null,
      inStockOnly: false,
      color: null,
    };

    this.ItemsService.getItems().then(resp => {
      this.$scope.items = resp.data.items;
    });

    this.DictionaryService.getColors().then(resp => {
      this.$scope.colors = resp.colors;
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

SearchController.$inject = ['$scope', '$routeParams', '$location', 'ItemsService', 'CartService', 'DictionaryService'];
export default SearchController;
