import _ from 'lodash';

class AuthService {
  constructor($q, $resource) {
    this.$q = $q;
    this.$resource = $resource;
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

    dfd.resolve();
    return dfd.promise;
  }

  static createInstance($q, $resource) {
    AuthService.instance = new AuthService($q, $resource);
    return AuthService.instance;
  }
}

AuthService.createInstance.$inject = ['$q', '$resource'];

export default AuthService;
