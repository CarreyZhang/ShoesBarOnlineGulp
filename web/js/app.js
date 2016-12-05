'use strict';

/* App Module */

var ShoesBarApp = angular.module('ShoesBarApp', [
  'ngRoute',
  'MainPageCtrl',
  'MyDirectives',
  'shoesServices',
  'ShoesDetailCtrl'
]);

ShoesBarApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/shoesDetail/:shoeId/:whereComeFrom', {
        templateUrl: 'views/ShoesDetailInfo.html',
        controller: 'ShoesDetailCtrl'
      }).
      when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      }).
      when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      }).
      when('/mainPage', {
        templateUrl: 'views/main_page.html',
        controller: 'MainPageCtrl'
      }).
      otherwise({
        redirectTo: '/mainPage'
      });
  }]);