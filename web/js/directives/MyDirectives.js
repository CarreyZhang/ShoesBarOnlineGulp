'use strict';

var MyDirectives = angular.module('MyDirectives', []);

MyDirectives.directive('pageheader', function(){
	return {
        templateUrl:"views/header.html",
        restrict:'E'	
	};
});

MyDirectives.directive('pagetitle', function(){
	return {
        templateUrl:"views/title.html",
        restrict:'E'	
	};
});

MyDirectives.directive('pagemiddle', function(){
	return {
        templateUrl:"views/middle.html",
        restrict:'E'	
	};
});

MyDirectives.directive('pagetailer', function(){
	return {
        templateUrl:"views/tailer.html",
        restrict:'E'	
	};
});