(function(){
  var app = angular.module('ionicMeterApp');

  app.directive('knob',
    ['$timeout',
    '$ionicPopup',
    '$ionicLoading',
    '$state',
    'UserService',
    '$rootScope',
    function(
      $timeout,
      $ionicPopup,
      $ionicLoading,
      $state,
      UserService,
      $rootScope
    ) {
      'use strict';

      return {
          restrict: 'EA',
          replace: true,
          template: '<input value="{{ knobData }}"/>',
          scope: {
              knobData: '=',
              knobOptions: '&'
          },
          link: function($scope, $element) {
              var knobInit = $scope.knobOptions() || {};

              knobInit.release = function(newValue) {
                  $timeout(function() {
                      $scope.knobData = newValue;

                      console.log(UserService.currentUser);

                      $ionicPopup.confirm({
                        template: 'Save this record?'
                      }).then(function(res) {
                        if(res) {
                          console.log('Saving!');

                          var BgTest = Parse.Object.extend("BgTest");
                          var bgtest = new BgTest();
                          bgtest.set("value", newValue);
                          bgtest.set("units", "mgDL");
                          bgtest.set("createdBy", Parse.User.current());
                          bgtest.save(null,{
                            success: function() {
                              $rootScope.notify("Save success!");
                            },
                            error: function(err) {
                              $rootScope.notify("Save failed! Try again.");
                              console.log("BgTest save error: " + err);
                            }
                          });

                        } else {
                          console.log('Aborting!');
                        }
                      });
                  });
              };

              knobInit.change = function(v) {
                console.log(v);
              };

              knobInit.draw = function() {

                if($scope.knobOptions().skin == 'tron') {
                  this.cursorExt = 0.3;

                  var a = this.arc(this.cv)  // Arc
                      , pa                   // Previous arc
                      , r = 1;

                  this.g.lineWidth = this.lineWidth;

                  if (this.o.displayPrevious) {
                      pa = this.arc(this.v);
                      this.g.beginPath();
                      this.g.strokeStyle = this.pColor;
                      this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
                      this.g.stroke();
                  }

                  this.g.beginPath();
                  this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
                  this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
                  this.g.stroke();

                  this.g.lineWidth = 2;
                  this.g.beginPath();
                  this.g.strokeStyle = this.o.fgColor;
                  this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                  this.g.stroke();

                  return false;
                }
              };

              $scope.$watch('knobData', function(newValue, oldValue) {
                  if (newValue != oldValue) {
                      $($element).val(newValue).change();
                  }
              });

              $($element).val($scope.knobData).knob(knobInit);
          }
      };
  }]);
}());
