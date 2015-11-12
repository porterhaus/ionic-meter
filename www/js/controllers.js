(function(){

  var app = angular.module('ionicMeterApp');

  app.controller('AppController', function() {
    console.log('App Controller');
  });
  app.controller('MeterController', function($scope, $rootScope, $state, UserService) {
    console.log('Meter Controller');

    $scope.logout = function() {
      Parse.User.logOut();
      UserService.currentUser = null;
      $state.go('login');
    };

  });
  app.controller('LoginController', function($scope, $rootScope, $state, UserService) {
    console.log('Login Controller');

    $scope.user = {};
    $scope.error = {};

    $scope.login = function() {
      Parse.User.logIn($scope.user.username, $scope.user.password, {
        success: function(user) {
          UserService.currentUser = user;
          $state.go('meter');
          $scope.user = {};
        },
        error: function(err) {
          if (err.code === 101) {
              $scope.error.message = 'Invalid login credentials';
          } else {
              $scope.error.message = 'An unexpected error has ' +
                  'occurred, please try again.';
          }
          $scope.$apply();
        }
      });
    };

  });
  app.controller('SignupController', function($scope, $rootScope, $state) {
    console.log('Signup Controller');

    $scope.user = {};
    $scope.error = {};

    $scope.signup = function() {
      var user = new Parse.User();
          user.set("username", $scope.user.username);
          user.set("email", $scope.user.email);
          user.set("password", $scope.user.password);
      user.signUp(null, {
        success: function(user) {

        },
        error: function(error) {

        }
      });
    };

  });
  app.controller('ForgotController', function() {
    console.log('Forgot Controller');
  });

}());
