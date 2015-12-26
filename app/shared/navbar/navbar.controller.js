import _ from 'lodash';

class NavbarController {
  constructor($scope, $location, $rootScope, AuthService, CartService) {
    this.$scope = $scope;
    this.$location = $location;
    this.$rootScope = $rootScope;
    this.AuthService = AuthService;
    this.CartService = CartService;

    _.bindAll(this, 'handleLoginStatusChanged', 'handleRedirectToLogin', 'handleNotifyUser', 'handleCartItemsChanged', 'closeAlert', 'removeFromCart');

    $scope.closeAlert = this.closeAlert;

    $scope.alert = {
      show: false,
      type: 'error',
      msg: '',
    };

    $scope.$on('redirectToLogin', this.handleRedirectToLogin);

    $scope.$on('loginStatusChanged', this.handleLoginStatusChanged);

    $scope.$on('notifyUser', this.handleNotifyUser);

    $scope.$on('hideAlerts', (evt) => this.closeAlert());

    $scope.$on('cartItemsChanged', this.handleCartItemsChanged);

    $scope.logout = () => AuthService.logOut();

    AuthService.checkIfAuthenticated();
    let cartItemsDfd = CartService.getItems();
    cartItemsDfd.then(cartItems => {
      $rootScope.$broadcast('cartItemsChanged', cartItems);
    });

    $scope.cartPopup = {
      templateUrl: './shared/navbar/cart.popup.view.html',
      title: 'Items',
    };

    $scope.removeFromCart = this.removeFromCart;
  }

  handleLoginStatusChanged(evt, isAuthenticated, username) {
    this.$rootScope.isAuthenticated = isAuthenticated;
    this.$rootScope.username = username;

    if (!isAuthenticated) {
      this.CartService.clearCart();
      this.AuthService.redirectToLogin();
    }
  }

  handleRedirectToLogin(evt) {
    this.$location.path(this.AuthService.loginPath);
    this.$location.replace();
  }

  handleNotifyUser(evt, alertInfo) {
    this._showAlert(alertInfo.type, alertInfo.msg);
  }

  handleCartItemsChanged(evt, cartItems) {
    this.$scope.cartItems = cartItems || [];
    this.$scope.cartItemsCount = cartItems.length;
  }

  _showAlert(type, msg) {
    let alert = this.$scope.alert;

    alert.type = type;
    alert.msg = msg;
    alert.show = true;
    alert.className = 'alert-' + type;
  }

  closeAlert() {
    this.$scope.alert.show = false;
  }

  removeFromCart(item) {
    this.CartService.removeItem(item);
  }
}

NavbarController.$inject = ['$scope', '$location', '$rootScope', 'AuthService', 'CartService'];
export default NavbarController;
