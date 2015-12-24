import _ from 'lodash';

class AuthService {
  constructor($q, $resource, $rootScope, $location) {
    this.$q = $q;
    this.$resource = $resource;
    this.$rootScope = $rootScope;
    this.$location = $location;

    this.loginPath = '/login';
    this.user = {
      isAuthenticated: false,
      email: null,
    };
  }

  signUp(email, password) {
    var dfd = this.$q.defer();

    let users = JSON.parse(localStorage.getItem('users')) || {};
    let user = users[email];

    if (!user) {
      user = { email: email, hashedPassword: password };
      users[email] = user;
      localStorage.setItem('users', JSON.stringify(users));
      dfd.resolve(user);
    } else {
      dfd.reject({ msg: 'Email is already in use.' });
    }

    return dfd.promise;
  }

  logIn(email, password) {
    var dfd = this.$q.defer();

    let users = JSON.parse(localStorage.getItem('users')) || {};
    let user = users[email];

    if (!user) {
      dfd.reject({ msg: 'Email is not found.' });
      return dfd.promise;
    }

    if (user.password !== password) {
      dfd.reject({ msg: 'Password is incorrect.' });
      return dfd.promise;
    }

    this._changeAuth(true, email);

    dfd.resolve();
    return dfd.promise;
  }

  _changeAuth(isAuthenticated, email) {
    this.user.isAuthenticated = isAuthenticated;
    this.user.email = isAuthenticated ? email : null;

    this.$rootScope.$broadcast('loginStatusChanged', isAuthenticated);
  }

  redirectToLogin() {
    this.$rootScope.$broadcast('redirectToLogin', null);
  }

  static createInstance($q, $resource, $rootScope, $location) {
    AuthService.instance = new AuthService($q, $resource, $rootScope, $location);
    return AuthService.instance;
  }
}

AuthService.createInstance.$inject = ['$q', '$resource', '$rootScope', '$location'];

export default AuthService;
