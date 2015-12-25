import _ from 'lodash';

class CartService {
  constructor($q, $resource, $rootScope) {
    this.$q = $q;
    this.$resource = $resource;
    this.$rootScope = $rootScope;
  }

  clearCart() {
    var dfd = this.$q.defer();

    sessionStorage.removeItem('cartItems');
    this.$rootScope.$broadcast('cartItemsChanged', []);

    return dfd.promise;
  }

  addItem(item) {
    var dfd = this.$q.defer();

    let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    let itemInCart = _.find(cartItems, { id: item.id });

    if (!itemInCart) {
      cartItems.push(item);
      sessionStorage.setItem('cartItems', JSON.stringify(cartItems));

      this.$rootScope.$broadcast('cartItemsChanged', cartItems);

      dfd.resolve(cartItems);
    } else {
      dfd.reject({ msg: 'Item is already in the cart.' });
    }

    return dfd.promise;
  }

  removeItem(item) {
    var dfd = this.$q.defer();

    let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    let cartItem = _.find(cartItems, { id: item.id });

    if (!!cartItem) {
      _.remove(cartItems, x => x.id == cartItem.id);
      sessionStorage.setItem('cartItems', JSON.stringify(cartItems));

      this.$rootScope.$broadcast('cartItemsChanged', cartItems);

      dfd.resolve(cartItems);
    } else {
      dfd.reject({ msg: 'Item is not found in the cart.' });
    }

    return dfd.promise;
  }

  getItems() {
    var dfd = this.$q.defer();

    let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    dfd.resolve(cartItems);

    return dfd.promise;
  }

  static createInstance($q, $resource, $rootScope) {
    CartService.instance = new CartService($q, $resource, $rootScope);
    return CartService.instance;
  }
}

CartService.createInstance.$inject = ['$q', '$resource', '$rootScope'];

export default CartService;
