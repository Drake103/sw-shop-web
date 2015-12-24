class NavbarController {
  constructor($scope, $location, $rootScope, AuthService) {
    this.$scope = $scope;
    this.$location = $location;
    this.$rootScope = $rootScope;
    this.AuthService = AuthService;

    $scope.alert = {
      show: false,
      type: 'error',
      msg: '',
    };

    let _showAlert = (type, msg) => {
      $scope.alert.type = type;
      $scope.alert.msg = msg;
      $scope.alert.show = true;
      $scope.alert.className = 'alert-' + type;
    };

    $scope.closeAlert = () => {
      $scope.alert.show = false;
    };

    $scope.$on('redirectToLogin', (evt) => {
      $location.path(AuthService.loginPath);
      $location.replace();
    });

    $scope.$on('loginStatusChanged', (evt, isAuthenticated) => {
      $rootScope.isAuthenticated = isAuthenticated;
    });

    $scope.$on('notifyUser', (evt, alertInfo) => {
      _showAlert(alertInfo.type, alertInfo.msg);
    });
  }
}

NavbarController.$inject = ['$scope', '$location', '$rootScope', 'AuthService'];
export default NavbarController;
