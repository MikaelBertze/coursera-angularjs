(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {


  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // Home page
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'src/templates/home.template.html'
  });

  // Menu
  $stateProvider
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/templates/menu.template.html',
    controller: "MenuController as menuCtrl",
    resolve: {
       items: ['MenuDataService', function (MenuDataService) {
         return MenuDataService.getAllCategories()
          .then(function(res) { return res.data })
       }]
     }
    });

  // Items
  $stateProvider
  .state('items', {
    url: '/items/{category}',
    templateUrl: 'src/templates/menuitems.template.html',
    controller: "ItemsController as itemsCtrl",
    resolve: {
       items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
         return MenuDataService.getItemsForCategory($stateParams.category)
         //return MenuDataService.getItemsForCategory("L")
          .then(function(res) {
            return res.data })
       }]
      }
    });

}

})();
