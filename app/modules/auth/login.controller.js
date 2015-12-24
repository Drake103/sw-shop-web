import _ from 'lodash';
import config from 'config';

class LogInController {
  constructor($scope, $routeParams, $location, $rootScope, AuthService) {
    this.$scope = $scope;
    this.$location = $location;
    this.$rootScope = $rootScope;
    this.AuthService = AuthService;

    $scope.vm = {};
  }

  login() {
    let vm = this.$scope.vm;

    if (!vm.email || !config.emailRegexp.test(vm.email)) {
      this.showError('Invalid email.');
      return;
    }

    let dfd = this.AuthService.logIn(vm.email, vm.password);
    dfd.then(resp => {
      this.$location.path('/');
      this.$location.replace();
    }, resp => {

      this.showError(resp.msg);
    });
  }

  redirectToSignup() {
    this.$location.path('/signup');
  }

  showError(msg) {
    this.$rootScope.$broadcast('notifyUser', {type:'error', msg});
  }
}

LogInController.$inject = ['$scope', '$routeParams', '$location', '$rootScope', 'AuthService'];
export default LogInController;
