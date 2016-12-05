'use strict';

var ShoesDetailCtrl = angular.module('ShoesDetailCtrl', []);

/*ShoesDetailCtrl.controller('ShoesDetailCtrl', ['$scope', '$routeParams', 'Shoes', function($scope, $routeParams, Shoes){

	$scope.shoeDetailInfo = Shoes.get({shoeId:$routeParams.shoeId}, function(Shoes){
		$scope.shoesDetailInfo = Shoes;
		$scope.shoeBigImages =  Shoes.bigimages;
		$scope.shoeSmallImages =  Shoes.smallimages;
		$scope.mainImageUrl = Shoes.bigimages[0];
		$scope.shoeColors = Shoes.shoecolors;
		//将含有颜色的数组转换为含有false的数组
		var num = $scope.shoeColors.length;
		$scope.tempShoeColors = new Array(num);
		for (var i = 0; i < num; i++) {
			$scope.tempShoeColors[i] = {"tempShoeColor":$scope.shoeColors[i], 
										"choose": false
										};
		}
	});

	$scope.dataShoeID = $routeParams.shoeId;
	$scope.dataWhereComeFrom = $routeParams.whereComeFrom;

	$scope.setBigImg = function(imageIndex) {
		$scope.mainImageUrl = $scope.shoeBigImages[imageIndex];
	},

	$scope.chooseOrNot = true;
	$scope.chooseShoeColor = function(shoeColorIndex) {
		//轮流选中颜色的鞋子，不能多选
		var num = $scope.tempShoeColors.length;
		for (var j = 0; j < num; j++) {
			if (shoeColorIndex == j) {
				$scope.tempShoeColors[j].choose = $scope.chooseOrNot;
				$scope.chooseOrNot = !$scope.chooseOrNot;
			} else {
				$scope.tempShoeColors[j].choose = false;
			}
		}
	}


}]);*/



ShoesDetailCtrl.controller('ShoesDetailCtrl', ['$scope', '$routeParams', 'Shoes', function($scope, $routeParams, Shoes){

	$scope.shoeDetailInfo = Shoes.get({shoeId:$routeParams.shoeId}, function(Shoes){
		$scope.shoesDetailInfo = Shoes;
		$scope.shoeBigImages =  Shoes.shoecolors[0].shoeBigImage;
		$scope.shoeSmallImages =  Shoes.shoecolors[0].shoeSmallImage;
		$scope.mainImageUrl = $scope.shoeBigImages[0];
		$scope.shoeColors = Shoes.shoecolors;
		$scope.sizes = Shoes.shoecolors[0].sizes;
		$scope.tempRepertories = Shoes.shoecolors[0].repertories;
		//将商品尺寸转换为可标记的数组,初始化
		$scope.sizeNum = $scope.sizes.length;
		$scope.tempSizes = new Array($scope.sizeNum);
		for (var i = 0; i < $scope.sizeNum; i++) {
			$scope.tempSizes[i] = {
				"size": $scope.sizes[i],
				"clickItOrNot": false,
				"overOrNot": false,
				"overOutOrNot": false,
				"nowRepertory": $scope.tempRepertories[i]
			}
		}
	});

	$scope.dataShoeID = $routeParams.shoeId;
	$scope.dataWhereComeFrom = $routeParams.whereComeFrom;

	$scope.setBigImg = function(imageIndex) {
		$scope.mainImageUrl = $scope.shoeBigImages[imageIndex];
	};

	$scope.chooseOrNot = true;
	//该变量为声明当前选择哪个颜色的鞋子,初始化为不选择任何颜色的鞋子
	$scope.whichColorShoeYouChoose = -1;
	$scope.chooseShoeColor = function(shoeColorIndex) {
		$scope.whichColorShoeYouChoose = shoeColorIndex;
		console.log("$scope.whichColorShoeYouChoose:" + $scope.whichColorShoeYouChoose);
		//选择当前需要重新赋值给当前颜色鞋子的所有尺寸
		$scope.sizes = $scope.shoeColors[shoeColorIndex].sizes;
		$scope.tempRepertories = $scope.shoeColors[shoeColorIndex].repertories;
		//将商品尺寸转换为可标记的数组,初始化
		$scope.sizeNum = $scope.sizes.length;
		$scope.tempSizes = new Array($scope.sizeNum);
		for (var i = 0; i < $scope.sizeNum; i++) {
			$scope.tempSizes[i] = {
				"size": $scope.sizes[i],
				"clickItOrNot": false,
				"overOrNot": false,
				"overOutOrNot": false,
				"nowRepertory": $scope.tempRepertories[i]
			}
			/*console.log("nowRepertory:" + $scope.tempSizes[i].nowRepertory);*/
		}

		//轮流选中颜色的鞋子，不能多选
		var num = $scope.shoeColors.length;
		for (var j = 0; j < num; j++) {
			if (shoeColorIndex == j) {
				$scope.shoeColors[j].shooseOrNot = $scope.chooseOrNot;
				$scope.chooseOrNot = !$scope.chooseOrNot;
				//重置当前的商品的大图标和小图标
				$scope.mainImageUrl = $scope.shoeColors[j].shoeBigImage[0];
				$scope.shoeSmallImages = $scope.shoeColors[j].shoeSmallImage;
				$scope.shoeBigImages = $scope.shoeColors[j].shoeBigImage;
				$scope.showSizeAndRepertory = false;
			} else {
				$scope.shoeColors[j].shooseOrNot = false;
			}
		}		
	};

	$scope.showSizeAndRepertory = false;

	$scope.chooseShoeSize = function(shoeSize) {
		console.log("click it, size is:" + shoeSize);
		for (var i = 0; i < $scope.sizeNum; i++) {
			if (shoeSize == i) {
				$scope.tempSizes[i].clickItOrNot = true;
				$scope.shoeShowSize = $scope.tempSizes[i].size;		
				$scope.showRepertory = $scope.tempSizes[i].nowRepertory;
				$scope.showSizeAndRepertory = true;
			} else {
				$scope.tempSizes[i].clickItOrNot = false;
			}
		}	
	};

	$scope.overIt = function(shoeSize) {
		for (var i = 0; i < $scope.sizeNum; i++) {
			if (shoeSize == i) {
				$scope.tempSizes[i].overOrNot = true;
			} else {
				$scope.tempSizes[i].overOrNot = false;
			}
		}
	};

	$scope.leaveIt = function(shoeSize) {
		for (var i = 0; i < $scope.sizeNum; i++) {
			if (shoeSize == i) {
				$scope.tempSizes[i].overOrNot = false;
			} 
		}
	};

	$scope.buyShoeNum = 1;	
	$scope.reduceNum = function() {
		if ($scope.buyShoeNum >= 1) {
			$scope.buyShoeNum = $scope.buyShoeNum - 1;
		} else {
			alert("the number must be more than zero!");
		}
	};

	$scope.notNum = function() {
		var reg = new RegExp("^(0|[1-9][0-9]*)$");
/*		console.log(angular.isNumber($scope.buyShoeNum));
		console.log(typeof($scope.buyShoeNum));*/
		if (!reg.test($scope.buyShoeNum)) {
			$scope.buyShoeNum = 1;
			alert("it must be a number!");
		}
	};

	$scope.addNum = function() {
		//确保这里的数量小于库存数量
		$scope.buyShoeNum = $scope.buyShoeNum + 1;
	}

}]);