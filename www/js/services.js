(function(){
  var app = angular.module('ionicMeterApp');

  app.service('UserService', function(){

    var currentUser = Parse.User.current();

    return {
      currentUser:  currentUser
    };
  });

}());
