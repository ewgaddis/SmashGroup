(function(){

var app = angular.module('smashGroup', []);

app.controller('userController', [
	'$scope',
	'$http',
	function($scope, $http) {
		$http.get('/users/get').success(function(data, status, headers, config) {
	    	$scope.user = data;
	    	
	    	$http.get('/groups/getJoined').success(function(data, status, headers, config) {
		    	$scope.user.joinedGroups = data;
	    	}).error(function(data, status, headers, config) {
		    	$scope.user.joinedGroups = [];
	    	});
    	}).error(function(data, status, headers, config) {
	    	$scope.user = null;
    	});
	}
]);

app.controller('groupController', [
	'$scope',
    '$http',
  	function($scope, $http) {
    	$scope.groupCategories = categories;
    	
		$scope.getClass = function(category){
			return category.icon;
		};
	}
]);
  
  var categories = [
    {
      name: "Video Games",
	  icon: "fa-gamepad",
      groups: [{
        name: "Super Smash Bros."
      }, {
        name: "Mega Man X"
      }]
    },
	{
      name: "Movies",
	  icon: "fa-film",
      groups: [{
        name: "Inception"
      }, {
        name: "Star Wars"
      }]
    }
  ];

})();