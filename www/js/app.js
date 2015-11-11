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
    $stateProvider
      .state('meter', {
        url: '/meter',
        templateUrl: 'templates/meter.html',
        controller: 'MeterController',
        data: {
          authenticate: true
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'templates/signup.html',
        controller: 'SignupController'
      })
      .state('forgot', {
        url: '/forgot',
        templateUrl: 'templates/forgot.html',
        controller: 'ForgotController'
      })
      ;
    $urlRouterProvider.otherwise('/meter');
  });

  app.run(function($rootScope, $state){
    $rootScope.$on('$stateChangeStart', function(event, next, fromParams, toParams, fromState, toState) {
      console.log('stateChangeStart');
      if ('data' in next) {
        console.log('redirect to login');
        event.preventDefault();
        $state.go('login');
      }
    });
  });

}());
