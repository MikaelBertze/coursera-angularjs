(function () {
'use strict';

angular.module('data')
.service("MenuDataService", MenuDataService);

MenuDataService.$inject = ['$http'];

function MenuDataService($http) {
  var service = this;
  service.getAllCategories = function() {
    console.log("Get categories");
    return $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/categories.json"
      });
  };

  service.getItemsForCategory = function(categoryShortName) {
    console.log("get items: " + categoryShortName);
    return $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/menu_items.json",
        params: { "category": categoryShortName }
      });

  };

}

})();
