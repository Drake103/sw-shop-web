import angular from 'angular';
import 'angular-route';
import 'angular-resource';

let moduleName = 'CatalogModule';

import ItemsService from './items.service';
import SearchController from './search.controller';

let ngModule = angular.module(moduleName, ['ngRoute', 'ngResource']);

ngModule.factory('ItemsService', ItemsService.createInstance);
ngModule.controller('SearchController', SearchController);

ngModule.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/modules/catalog/search.view.html',
      controller: 'SearchController',
    });
});

export default moduleName;
