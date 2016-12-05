'use strict';

var MainPageCtrl = angular.module('MainPageCtrl', []);

MainPageCtrl.controller('MainPageCtrl', ['$scope', function($scope){

	$scope.maleBar = "青年男鞋馆";
	
}]);

MainPageCtrl.controller('PageTitle', ['$scope', function($scope){

}]);

MainPageCtrl.controller('FemaleShoeslist', ['$scope', 'FemaleShoes', function($scope, FemaleShoes){
	$scope.femaleshoes = FemaleShoes.query();
}]);

MainPageCtrl.controller('MaleShoeslist', ['$scope', 'MaleShoes', function($scope, MaleShoes){
	$scope.maleshoes = MaleShoes.query();
}])
