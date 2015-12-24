import angular from 'angular';
import 'angular-route';
import 'angular-resource';

let moduleName = 'CatalogModule';

import ItemsService from './items.service';
import CartService from './cart.service';

import catalogSearchFilter from './catalog.search.filter';

import SearchController from './search.controller';

let ngModule = angular.module(moduleName, ['ngRoute', 'ngResource']);

ngModule.factory('ItemsService', ItemsService.createInstance);
ngModule.factory('CartService', CartService.createInstance);
ngModule.filter('catalogSearch', catalogSearchFilter);
ngModule.controller('SearchController', SearchController);

ngModule.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/modules/catalog/search.view.html',
      controller: 'SearchController',
      access: {
        requiresLogin: true,
      },
    });
});

export default moduleName;
