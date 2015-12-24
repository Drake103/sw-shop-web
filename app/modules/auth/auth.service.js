import _ from 'lodash';
import SHA256 from 'crypto-js/sha256';

class AuthService {
  constructor($q, $resource, $rootScope, $location, $cookieStore) {
    this.$q = $q;
    this.$resource = $resource;
    this.$rootScope = $rootScope;
    this.$location = $location;
    this.$cookieStore = $cookieStore;

    this.loginPath = '/login';
    this.user = {
      isAuthenticated: false,
      email: null,
    };

    this.checkIfAuthenticated();
  }

  checkIfAuthenticated() {
    let token = this.$cookieStore.get('auth-token');
    let isAuthenticated = false;
    let email = null;

    if (!!token) {
      let users = JSON.parse(localStorage.getItem('users')) || [];
      let user = _.find(users, { authToken: token });

      isAuthenticated = !!user;
      email = !!user ? user.email : null;
    }

    this._changeAuth(isAuthenticated, email);
  }

  signUp(email, password) {
    var dfd = this.$q.defer();

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = _.find(users, { email: email });

    if (!user) {
      user = {
        email: email,
        hashedPassword: SHA256(password).toString(),
        authToken: null,
      };
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      dfd.resolve(user);
    } else {
      dfd.reject({ msg: 'Email is already in use.' });
    }

    return dfd.promise;
  }

  logIn(email, password) {
    var dfd = this.$q.defer();

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = _.find(users, { email: email });

    if (!user) {
      dfd.reject({ msg: 'Email is not found.' });
      return dfd.promise;
    }

    if (user.hashedPassword !== SHA256(password).toString()) {
      dfd.reject({ msg: 'Password is incorrect.' });
      return dfd.promise;
    }

    let dtString = (new Date()).toString();
    user.authToken = SHA256(dtString).toString();
    this.$cookieStore.put('auth-token', user.authToken);

    localStorage.setItem('users', JSON.stringify(users));

    this._changeAuth(true, email);

    dfd.resolve();
    return dfd.promise;
  }

  logOut() {
    if (!this.user.isAuthenticated) return;

    let email = this.user.email;
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = _.find(users, { email: email });

    if (user != null) {
      user.authToken = null;
      localStorage.setItem('users', JSON.stringify(users));
    }

    this.$cookieStore.remove('auth-token');

    this._changeAuth(false, null);
  }

  _changeAuth(isAuthenticated, email) {
    this.user.isAuthenticated = isAuthenticated;
    this.user.email = isAuthenticated ? email : null;
    console.log('broadcasting loginStatusChanged');
    this.$rootScope.$broadcast('loginStatusChanged', isAuthenticated, email);
  }

  redirectToLogin() {
    this.$rootScope.$broadcast('redirectToLogin', null);
  }

  static createInstance($q, $resource, $rootScope, $location, $cookieStore) {
    AuthService.instance = new AuthService($q, $resource, $rootScope, $location, $cookieStore);
    return AuthService.instance;
  }
}

AuthService.createInstance.$inject = ['$q', '$resource', '$rootScope', '$location', '$cookieStore'];

export default AuthService;
