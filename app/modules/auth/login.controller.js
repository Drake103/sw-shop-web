import _ from 'lodash';

class LogInController {
  constructor($scope, $routeParams, $location, AuthService) {
    this.$scope = $scope;
    this.AuthService = AuthService;
  }

  signup() {
    let dfd = this.AuthService.logIn(this.email, this.password);
    dfd.then(resp => {
      alert('success');
    }, resp => {

      alert(resp.msg);
    });
  }
}

LogInController.$inject = ['$scope', '$routeParams', '$location', 'AuthService'];
export default LogInController;
