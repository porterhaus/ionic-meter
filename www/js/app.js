(function(){

  var app = angular.module('ionicMeterApp', ['ionic']);

  app.run(function($ionicPlatform, $ionicLoading, $rootScope, $window) {

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

    $rootScope.show = function(text) {
      $rootScope.loading = $ionicLoading.show({
        template: text ? text : 'Loading...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
    };

    $rootScope.hide = function() {
      $ionicLoading.hide();
    };

    $rootScope.notify = function(text) {
      $rootScope.show(text);
      $window.setTimeout(function() {
        $rootScope.hide();
        window.location.reload(true);
      }, 1999);
    };

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

  app.run(function($rootScope, $state, UserService){
    $rootScope.$on('$stateChangeStart', function(event, next, fromParams, toParams, fromState, toState) {
      // Debug logging
      console.log('stateChangeStart');
      console.log(UserService.currentUser);

      // Check state for 'next' and inspect for 'data'
      if ('data' in next && !UserService.currentUser) {
        console.log('redirect to login');
        event.preventDefault();
        $state.go('login');
      }
    });
  });

}());
