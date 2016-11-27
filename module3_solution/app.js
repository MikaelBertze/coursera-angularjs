(function () {
  'use strict'

  angular.module('ChinaMenu', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItems);

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(menuSearch) {
    var vm = this;

    // properties
    vm.searchTerm = "";

    vm.ignoreCase = true;

    vm.found = [];

    vm.searchResultVisible = false; //

    // functions
    vm.narrow = function() {
      vm.searchResultVisible = false;
      var result = menuSearch.getMatchedMenuItems(vm.searchTerm, vm.ignoreCase);
      result.then(function(result) {
        vm.searchResultVisible = true;
        vm.found = result;
      })
    };

    vm.remove = function(index) {
      vm.found.splice(index, 1);
      if (vm.found.length == 0) {
        vm.nothingFound = true;
      }
    }
  };

  function FoundItems() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        found: '<',
        onRemove: '&',
        nothingFound: '<' // adding to scope to be able to controll initial state
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'foundItems',
      bindToController: true
    };
    return ddo;
  }

  function FoundItemsDirectiveController() {
    var foundItems = this;

  }

  MenuSearchService.$inject = ['$http']
  function MenuSearchService($http) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm, ignoreCase) {
      return $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/menu_items.json"
      }).then(function (result) {
        // process result and only keep items that match
        var allItems = result.data.menu_items;
        var foundItems = []

        for (var i = 0; i < allItems.length; i++) {
          var description = allItems[i].description;
          // ignoring case in search
          if(isMatch(allItems[i].description, searchTerm, ignoreCase)) {
            foundItems.push(allItems[i]);
          }
        }

        // return processed items
        return foundItems;
      });
    }

    var isMatch = function(text, searchTerm, ignoreCase) {
      if (ignoreCase) {
        text = text.toUpperCase();
        searchTerm = searchTerm.toUpperCase();
      }
      return text.indexOf(searchTerm) >= 0;
    }
  }

})();
