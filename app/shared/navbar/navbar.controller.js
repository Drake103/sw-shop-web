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

    console.log('binding loginStatusChanged');
    $scope.$on('loginStatusChanged', (evt, isAuthenticated, username) => {
      console.log('loginStatusChanged invoked');

      $rootScope.isAuthenticated = isAuthenticated;
      $rootScope.username = username;

      if (!isAuthenticated) {
        AuthService.redirectToLogin();
      }
    });

    $scope.$on('notifyUser', (evt, alertInfo) => {
      _showAlert(alertInfo.type, alertInfo.msg);
    });

    $scope.$on('hideAlerts', (evt) => {
      $scope.closeAlert();
    });

    $scope.logout = () => {AuthService.logOut();};

    AuthService.checkIfAuthenticated();
  }
}

NavbarController.$inject = ['$scope', '$location', '$rootScope', 'AuthService'];
export default NavbarController;
