import angular from 'angular';
import 'angular-route';
import 'angular-resource';
import 'angular-ui-bootstrap';

let moduleName = 'CatalogModule';

let ngModule = angular.module(moduleName, ['ngRoute', 'ngResource', 'ui.bootstrap']);

import ItemsService from './items.service';
import CartService from './cart.service';
import DictionaryService from './dictionary.service';

ngModule.factory('ItemsService', ItemsService.createInstance);
ngModule.factory('CartService', CartService.createInstance);
ngModule.factory('DictionaryService', DictionaryService.createInstance);

import DatepickerDirective from '../../shared/datepicker/datepicker.directive';
import RatingDirective from '../../shared/rating/rating.directive';

ngModule.directive('swsDatepicker', DatepickerDirective.directiveFactory);
ngModule.directive('swsRating', RatingDirective.directiveFactory);

import catalogSearchFilter from './catalog.search.filter';

ngModule.filter('catalogSearch', catalogSearchFilter);

import SearchController from './search.controller';

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
