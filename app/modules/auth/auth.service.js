import _ from 'lodash';

class AuthService {
  constructor($q, $resource) {
    this.$q = $q;
    this.$resource = $resource;
  }

  static createInstance($q, $resource) {
    AuthService.instance = new AuthService($q, $resource);
    return AuthService.instance;
  }
}

AuthService.createInstance.$inject = ['$q', '$resource'];

export default AuthService;
