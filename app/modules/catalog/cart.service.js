import _ from 'lodash';

class CartService {
  constructor($q, $resource) {
    this.$q = $q;
    this.$resource = $resource;
  }

  addItem(item) {
    var dfd = this.$q.defer();

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let itemInCart = _.find(cartItems, { id: item.id });

    if (!itemInCart) {
      cartItems.push(item);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      dfd.resolve(cartItems);
    } else {
      dfd.reject({ msg: 'Item is already in the cart.' });
    }

    return dfd.promise;
  }

  removeItem(itemId) {
    var dfd = this.$q.defer();

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let item = _.find(cartItems, { id: itemId });

    if (!!item) {
      _.remove(cartItems, x => x.id == itemId);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      dfd.resolve(cartItems);
    } else {
      dfd.reject({ msg: 'Item is not found in the cart.' });
    }

    return dfd.promise;
  }

  getItems() {
    var dfd = this.$q.defer();

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    dfd.resolve(cartItems);

    return dfd.promise;
  }

  static createInstance($q, $resource) {
    CartService.instance = new CartService($q, $resource);
    return CartService.instance;
  }
}

CartService.createInstance.$inject = ['$q', '$resource'];

export default CartService;
