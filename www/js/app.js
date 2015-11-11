angular.module('ionicMeterApp', ['ionic'])

.run(function($ionicPlatform) {

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  Parse.initialize('2xSAk2c6Jzj9TzJcNcUKE42p7cKx6tNjiOKtLLrp','jHNUhXWZwoMwCqPH1aUpqau4oTbnwSuuIsesh5Ty');

  var TestObject = Parse.Object.extend("TestObject");
  var testObject = new TestObject();
  testObject.save({foo: "bar"}).then(function(object) {
    alert("yay! it worked");
  });

});
