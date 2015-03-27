(function(){

  var app = angular.module('smashGroup', []);

  app.controller('groupController', function(){
    this.groupCategories = categories;
	this.getClass = function(category){
		return category.icon;
	};
  });
  
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
 