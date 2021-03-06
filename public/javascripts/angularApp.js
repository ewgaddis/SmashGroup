(function(){

var app = angular.module('smashGroup', ['ui.router', 'ui.bootstrap']);

app.controller('userController', [
	'$scope',
	'$http',
	'$window',
    '$state',
	function($scope, $http, $window, $state) {
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
        
        $scope.search = function(search){
            $state.go('searchGroups', { value: search.value});
        };
	}
]);

app.controller('signupController', [
	'$scope',
    '$window',
	'$http',
	function($scope, $window, $http) {
        
		$http.get('/categories/get').success(function(data, status, headers, config) {
			$scope.categories = data;
		}).error(function(data, status, headers, config) {
			$scope.categories = [];
		});
        
        $scope.submitForm = function(){
            $scope.closeAlert();
            if(!angular.element('#button').hasClass('disabled'))
            {
                console.log("valid");
                $http.post( '/signup', $('form#myForm').serializeObject()).
                success(function(data, status, headers, config) {
                    $window.location = '/';
                }).
                error(function(data, status, headers, config) {
                    $scope.alerts = [{msg: data}];
                });
            }
        };
        
        $scope.closeAlert = function() {
            $scope.alerts = [];
        };
	}
]);

app.controller('loginController', [
	'$scope',
    '$window',
	'$http',
	function($scope, $window, $http) {
        
        $scope.submitForm = function(){
            $scope.closeAlert();
            $http.post( '/login', $('form#myForm').serializeObject()).
            success(function(data, status, headers, config) {
                $window.location = '/';
            }).
            error(function(data, status, headers, config) {
                $scope.alerts = [{msg: data}];
            });
        };
        
        $scope.closeAlert = function(index) {
            $scope.alerts = [];
        };
	}
]);

app.controller('groupsController', [
	'$scope',
	'$http',
    '$stateParams',
	function($scope, $http, $stateParams) {
		//get groups to display

        $http.get('/groups/getAll').success(function(data, status, headers, config){
            $scope.groups = data;
        });
	}
]);

app.controller('searchGroupsController', [
	'$scope',
	'$http',
    '$stateParams',
	function($scope, $http, $stateParams) {
		//get groups to display
        $http.post('/groups/getByName', {name: $stateParams.value}).success(function(data, status, headers, config){
            $scope.groups = data;
        });
	}
]);

app.controller('groupController', [
	'$scope',
	'$stateParams',
	'$http',
	'$window',
	function($scope, $stateParams, $http, $window) {
		$scope.group = {
			members: []
		};
		
		$scope.comments = [];
		$scope.requests = [];
		
		$http.post('/groups/getById', { id: $stateParams.id }).success(function(data, status, headers, config) {
			$scope.group = data;
			
			$http.post('/comments/get', { ids: $scope.group.comments }).success(function(data, status, headers, config) {
				$scope.comments = data;
			});
			
			$http.post('/group/getRequestUsers', { requestIds: $scope.group.membershipRequests })
			.success(function(data, status, headers, config) {
				$scope.requests = data;
			});
		});
		
		$scope.isMember = function(userId) {
			if($scope.group.members) {
				for(var i = 0; i < $scope.group.members.length; ++i) {
					if(userId == $scope.group.members[i]) {
						return true;
					}
				}
			}
			
			return false;
		};
		
		$scope.isRequestedMember = function(userId) {
			if($scope.group.membershipRequests) {
				for(var i = 0; i < $scope.group.membershipRequests.length; ++i) {
					if(userId == $scope.group.membershipRequests[i]) {
						return true;
					}
				}
			}
			
			return false;
		};
		
		$scope.newComment = null;
		
		$scope.addComment = function() {
			if($scope.newComment == null || $scope.newComment === '') {
				return;
			}
			
			$http.post('/comments/add', { groupId: $scope.group._id, content: $scope.newComment })
			.success(function(data, status, headers, config) {
				$scope.group.comments.push(data);
				$scope.comments.push(data);
				$scope.newComment = '';
			}).error(function(data, status, headers, config) {
				$window.alert("Failed to add comment");
			});
		};
		
		$scope.addRequest = function(userId) {
			$http.post('/group/addRequest', { groupId: $scope.group._id, userId: userId })
			.success(function(data, status, headers, config) {
				$window.location.reload();
			}).error(function(data, status, headers, config) {
				$window.alert("Failed to add request");
			});
		};
		
		$scope.addMember = function(userId) {
			$http.post('/group/addMember', { groupId: $scope.group._id, userId: userId })
			.success(function(data, status, headers, config) {
				$window.location.reload();
			}).error(function(data, status, headers, config) {
				$window.alert("Failed to add member");
			});
		};
		
		$scope.updateGroup = function() {
            $http.post('/group/update', {
	            groupId: $scope.group._id,
	            info:    $('form#myGroupForm').serializeObject()
            }).success(function(data, status, headers, config) {
                $window.location.reload();
            }).error(function(data, status, headers, config) {
                $window.alert('Failed to update group information.');
            });
        };
	}
]);

app.controller('profileController', [
	'$scope',
	'$http',
	function($scope, $http) {
	}
]);

app.controller('newGroupController', [
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
      }).state('searchGroups', {
        url: '/groups/{value}',
        templateUrl: '/templates/groups.ejs',
        controller: 'searchGroupsController'
      }).state('group', {
        url: '/group/{id}',
        templateUrl: '/templates/group.ejs',
        controller: 'groupController'
      }).state('profile', {
        url: '/profile',
        templateUrl: '/templates/profile.ejs',
        controller: 'profileController'
      }).state('newGroup', {
        url: '/newGroup',
        templateUrl: '/templates/newGroup.ejs',
        controller: 'newGroupController'
      });
    $urlRouterProvider.otherwise('groups');
}]);

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

})();