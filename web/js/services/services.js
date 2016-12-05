'use strict';

/* Services */

var shoesServices = angular.module('shoesServices', ['ngResource']);

shoesServices.factory('FemaleShoes', ['$resource',
  function($resource){
    return $resource('data/:shoeId.json', {}, {
      query: {method:'GET', params:{shoeId:'femaleshoes'}, isArray:true}
    });
  
  }]);

shoesServices.factory('MaleShoes', ['$resource', 
	function($resource){
	return $resource('data/:shoeId.json', {}, {
      query: {method:'GET', params:{shoeId:'maleshoes'}, isArray:true}
    });
}]);

shoesServices.factory('Shoes', ['$resource', 
	function($resource){
	return $resource('data/:shoeId.json', {}, {
      query: {method:'GET', params:{shoeId:'shoes'}, isArray:true}
    });
}])