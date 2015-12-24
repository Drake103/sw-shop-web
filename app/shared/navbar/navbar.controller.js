class NavbarController {
  constructor($scope, $location, $rootScope, AuthService) {
    this.$scope = $scope;
    this.$location = $location;
    this.AuthService = AuthService;

    this.$scope.$on('redirectToLogin', () => {
      $location.path(AuthService.loginPath);
      $location.replace();
    });

    $scope.$on('loginStatusChanged', function(evt, isAuthenticated) {
      $rootScope.isAuthenticated = isAuthenticated;
    });
  }
}

NavbarController.$inject = ['$scope', '$location', '$rootScope', 'AuthService'];
export default NavbarController;
