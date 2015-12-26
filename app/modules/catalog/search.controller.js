import _ from 'lodash';

class SearchController {
  constructor($scope, $routeParams, $location, ItemsService, CartService, DictionaryService) {
    this.$scope = $scope;
    this.ItemsService = ItemsService;
    this.CartService = CartService;
    this.DictionaryService = DictionaryService;

    _.bindAll(this, 'handleCartItemsChanged');

    this.$scope.items = [];
    this.$scope.filter = {
      dateFrom: null,
      dateTo: null,
      inStockOnly: false,
      color: null,
    };

    this.ItemsService.getItems().then(resp => {
      this.$scope.items = resp.data.items;

      this.CartService.getItems().then(cartItems => this.handleCartItemsChanged(null, cartItems));
    });

    this.DictionaryService.getColors().then(resp => {
      this.$scope.colors = resp.colors;
    });

    this.$scope.$on('cartItemsChanged', this.handleCartItemsChanged);
  }

  addToCart(item) {
    let dfd = this.CartService.addItem(item);

    dfd.then(items => {
    }, err => {

      alert(err.msg);
    });
  }

  handleCartItemsChanged(evt, cartItems) {
    let items = this.$scope.items;

    let cartItemsIds = _.pluck(cartItems, 'id');
    console.log(cartItemsIds);

    for (let i = 0; i < items.length; i++) {
      items[i].isInCart = _.includes(cartItemsIds, items[i].id);
    }

    console.log(items);
  }
}

SearchController.$inject = ['$scope', '$routeParams', '$location', 'ItemsService', 'CartService', 'DictionaryService'];
export default SearchController;
