(function(){

  var app = angular.module('ionicMeterApp', ['ionic']);

  app.run(function($ionicPlatform) {

    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });

    // Initialize Parse API with app keys.
    Parse.initialize(
      '2xSAk2c6Jzj9TzJcNcUKE42p7cKx6tNjiOKtLLrp',
      'jHNUhXWZwoMwCqPH1aUpqau4oTbnwSuuIsesh5Ty'
    );

  });

  app.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/');
  });

  app.run(function($rootScope){
    $rootScope.$on('$stateChangeStart', function(next, fromParams, toParams, fromState, toState) {

    });
  });

}());
