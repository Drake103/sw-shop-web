import _ from 'lodash';

class SignUpController {
  constructor($scope, $routeParams, $location, AuthService) {
    this.$scope = $scope;
    this.AuthService = AuthService;
  }

  signup() {
    let dfd = this.AuthService.signUp(this.email, this.password);
    dfd.then(resp => {
      alert('success');
    }, resp => {

      alert(resp.msg);
    });
  }
}

SignUpController.$inject = ['$scope', '$routeParams', '$location', 'AuthService'];
export default SignUpController;
