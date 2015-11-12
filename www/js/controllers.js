(function(){

  var app = angular.module('ionicMeterApp');

  app.controller('AppController', function($ionicHistory, $stateParams) {
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
    $scope.user = {
      username: '',
      password: ''
    };
    $scope.error = {};
    var user = $scope.user;
    $scope.login = function() {
      $rootScope.show("Logging in...");
      Parse.User.logIn(user.username, user.password, {
        success: function(user) {
          $rootScope.hide();
          $scope.user.username = '';
          $scope.user.password = '';
          $scope.error = '';
          UserService.currentUser = user;
          $state.go('meter');
        },
        error: function(user, err) {
          $rootScope.hide();
          $scope.error.message = err.message;
          $scope.$apply();
        }
      });
    };

    $scope.forgot = function() {
      $state.go('forgot');
    };

    $scope.signup = function() {
      $state.go('signup');
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
          UserService.currentUser = user;
          $state.go('meter');
        },
        error: function(user, err) {
          $scope.error.message = err.message;
        }
      });
    };

    $scope.login = function() {
      $state.go('login');
    };
  });

  app.controller('ForgotController', function($scope, $rootScope, $state) {
    console.log('Forgot Controller');

    $scope.user = {};
    $scope.error = {};
    $scope.state = {success: false};

    $scope.reset = function() {
      $rootScope.show('Resetting...');
      Parse.User.requestPasswordReset($scope.user.email, {
          success: function() {
              $rootScope.hide();
              $scope.state.success = true;
              $scope.user.email = '';
              $scope.$apply();
          },
          error: function(err) {
              $rootScope.hide();
              $scope.error.message = err.message;
          }
      });
    };

    $scope.login = function() {
      $state.go('login');
    };

  });

}());
