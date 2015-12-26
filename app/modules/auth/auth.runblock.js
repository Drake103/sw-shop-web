function authRunBlock($rootScope, $location, AuthService) {
  $rootScope.$on('$routeChangeStart', function(event, next) {
    if (!next || !next.access) return;

    let isAuthenticated = AuthService.user.isAuthenticated;

    if (next.access.requiresLogin && !isAuthenticated) {
      AuthService.redirectToLogin();
      return;
    }

    if (next.access.requiresAnonymous && isAuthenticated) {
      $location.path('/');
      $location.replace();
      return;
    }
  });
}

authRunBlock.$inject = ['$rootScope', '$location', 'AuthService'];

export default authRunBlock;
