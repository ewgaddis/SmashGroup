(function(){

var app = angular.module('smashGroup', []);

app.controller('userController', [
	'$scope',
	'$http',
	function($scope, $http) {
		$scope.userMenu = "/userMenu.html";
		
		$http.get('/users/get').success(function(data, status, headers, config) {
	    	$scope.user = data;
    	}).error(function(data, status, headers, config) {
	    	$scope.user = null;
    	});
	}
]);

app.controller('groupController', [
	'$scope',
    '$http',
  	function($scope, $http) {
    	this.groupCategories = categories;
    	
		this.getClass = function(category){
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
 