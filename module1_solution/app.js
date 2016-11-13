(function () {
  'use strict'

  angular.module('LunchCheck', [])
  .controller('LunchController', function($scope) {
    $scope.dishes = ""; // comma separated string of dishes
    $scope.message = "";
    $scope.check = function() {
      var dishes = $scope.dishes;
      if (!dishes) {
        $scope.message = "Please enter data first";
        return
      }
      $scope.message = ToMuch(dishes, 3) ? "Too much!" : "Enjoy!";
    };
  });

  function ToMuch(dishes, limit) {
    var items = dishes.split(',');
    var count = 0
    for (var i = 0; i < items.length; i++) {
      var dish = items[i].trim()
      count += dish ? 1: 0;
    }

    return count > limit;
  }
})();
