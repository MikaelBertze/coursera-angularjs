(function () {
'use strict';

angular.module('MenuApp')
  .controller("MenuController", MenuController);

  MenuController.$inject = ['items'];

  function MenuController(items) {
    var ctrl = this;

    ctrl.categories = items;
  }

})();
