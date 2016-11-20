(function () {
  'use strict'

  angular.module('ShoppingList', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .controller('ResetController', ResetController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(checkOffService) {
    var vm = this;

    // properties
    vm.items = checkOffService.itemsToBuy;

    // functions
    vm.buy = function(index) { checkOffService.buy(index); };

    vm.empty = function() { return vm.items.length == 0; };
  };

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(checkOffService) {
    var vm = this;

    // properties
    vm.items = checkOffService.boughtItems;

    // functions
    vm.empty = function() { return vm.items.length == 0; };
  };


  ResetController.$inject = ['ShoppingListCheckOffService'];
  function ResetController(checkOffService) {
    var vm = this;

    vm.reset = function() { checkOffService.reset(); };

    vm.isVisible = function() { return checkOffService.itemsToBuy.length == 0 };
  };


  function ShoppingListCheckOffService() {
    var service = this;

    // private fields
    var itemsToBuy = [];
    var boughtItems = [];

    // properties
    service.itemsToBuy = itemsToBuy;
    service.boughtItems = boughtItems;

    // public functions
    service.buy = function(itemIndex) {
      boughtItems.push(itemsToBuy[itemIndex]);
      itemsToBuy.splice(itemIndex, 1);
    };

    service.reset = function() {
      loadItems();
    };

    // private functions
    var loadItems = function() {
      itemsToBuy.length = 0;
      boughtItems.length = 0;

      itemsToBuy.push({ quantity: 10, name: 'milk' });
      itemsToBuy.push({ quantity: 5, name: 'candy' });
      itemsToBuy.push({ quantity: 3, name: 'banana' });
      itemsToBuy.push({ quantity: 1, name: 'lobster' });
      itemsToBuy.push({ quantity: 2, name: 'spagetti' });
      itemsToBuy.push({ quantity: 5, name: 'pizza' });
      itemsToBuy.push({ quantity: 7, name: 'steak' });
      itemsToBuy.push({ quantity: 2, name: 'beer' });
    };

    // loadItems to init itemsToBuy array at time of construction.
    loadItems();
  }

})();
