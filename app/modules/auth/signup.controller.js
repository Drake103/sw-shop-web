import _ from 'lodash';

class SignUpController {
  constructor($scope, $routeParams, $location, AuthService) {
    this.$scope = $scope;
    this.AuthService = AuthService;
  }
}

SignUpController.$inject = ['$scope', '$routeParams', '$location', 'AuthService'];
export default SignUpController;
