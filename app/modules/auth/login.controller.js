import _ from 'lodash';

class LogInController {
  constructor($scope, $routeParams, $location, AuthService) {
    this.$scope = $scope;
    this.$location = $location;
    this.AuthService = AuthService;
  }

  login() {
    let dfd = this.AuthService.logIn(this.email, this.password);
    dfd.then(resp => {
      this.$location.path('/');
      this.$location.replace();
    }, resp => {

      alert(resp.msg);
    });
  }

  redirectToSignup() {
    this.$location.path('/signup');
  }
}

LogInController.$inject = ['$scope', '$routeParams', '$location', 'AuthService'];
export default LogInController;
