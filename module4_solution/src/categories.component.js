(function(){

angular.module('MenuApp')
.component("categories", {
  templateUrl: "src/templates/categories.template.html",
  bindings: {
    items: '<'
  }
});
})();
