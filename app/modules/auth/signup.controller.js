import _ from 'lodash';
import config from 'config';

class SignUpController {
  constructor($scope, $routeParams, $location, $rootScope, AuthService) {
    this.$scope = $scope;
    this.$location = $location;
    this.$rootScope = $rootScope;
    this.AuthService = AuthService;

    $scope.vm = {};
  }

  signup() {
    let vm = this.$scope.vm;

    if (!vm.email || !config.emailRegexp.test(vm.email)) {
      this.showError('Invalid email.');
      return;
    }

    if (!vm.password || vm.password.length < config.passwordLengthMin) {
      this.showError('Password is too short. Minimum lengths is 6 characters.');
      return;
    }

    if (vm.password !== vm.passwordConfirm) {
      this.showError('Passwords do not match. Please check if CAPS LOCK is turned on.');
      return;
    }

    let dfd = this.AuthService.signUp(vm.email, vm.password);
    dfd.then(resp => {
      alert('Account was successfully created!');
      this.$location.path('/login');
    }, resp => {

      this.showError(resp.msg);
    });
  }

  showError(msg) {
    this.$rootScope.$broadcast('notifyUser', {type:'error', msg});
  }
}

SignUpController.$inject = ['$scope', '$routeParams', '$location', '$rootScope', 'AuthService'];
export default SignUpController;
