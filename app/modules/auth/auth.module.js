import angular from 'angular';
import 'angular-route';
import 'angular-resource';

import AuthService from './auth.service';
import LogInController from './login.controller';
import SignUpController from './signup.controller';

import AuthRunBlock from './auth.runblock';

let moduleName = 'AuthModule';

let ngModule = angular.module(moduleName, ['ngRoute', 'ngResource']);

ngModule.factory('AuthService', AuthService.createInstance);
ngModule.controller('LogInController', LogInController);
ngModule.controller('SignUpController', SignUpController);

ngModule.config(function($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: './modules/auth/login.view.html',
      controller: 'LogInController',
      access: {
        requiresAnonymous: true,
      },
    })
    .when('/signup', {
      templateUrl: './modules/auth/signup.view.html',
      controller: 'SignUpController',
      access: {
        requiresAnonymous: true,
      },
    });
});

export default moduleName;
