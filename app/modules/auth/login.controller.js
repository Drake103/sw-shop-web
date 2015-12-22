import _ from 'lodash';

class LogInController {
  constructor($scope, $routeParams, $location, AuthService) {
    this.$scope = $scope;
    this.AuthService = AuthService;
  }
}

LogInController.$inject = ['$scope', '$routeParams', '$location', 'AuthService'];
export default LogInController;
