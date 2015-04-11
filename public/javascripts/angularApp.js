(function(){

var app = angular.module('smashGroup', ['ui.router']);

app.controller('userController', [
	'$scope',
	'$http',
	'$window',
	function($scope, $http, $window) {
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
    	
    	$http.get('/categories/get').success(function(data, status, headers, config) {
			$scope.categories = data;
		}).error(function(data, status, headers, config) {
			$scope.categories = [];
		});
		
		$scope.isInterested = function(categoryId) {
			for(var i = 0; i < $scope.user.interests.length; ++i) {
				if($scope.user.interests[i] == categoryId) {
					return true;
				}
			}
			
			return false;
		};
	}
]);

app.controller('groupsController', [
	'$scope',
	'$http',
	function($scope, $http) {
		//get groups to display
	}
]);

app.controller('groupController', [
	'$scope',
	'$http',
	function($scope, $http) {
		//get group to display
	}
]);

app.controller('profileController', [
	'$scope',
	'$http',
	function($scope, $http) {
	}
]);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('groups', {
        url: '/groups',
        templateUrl: '/templates/groups.ejs',
        controller: 'groupsController'
      }).state('group', {
        url: '/group',
        templateUrl: '/templates/group.ejs',
        controller: 'groupController'
      }).state('profile', {
        url: '/profile',
        templateUrl: '/templates/profile.ejs',
        controller: 'profileController'
      });
    $urlRouterProvider.otherwise('groups');
}]);

})();