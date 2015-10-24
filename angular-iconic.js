/**
 * Iconic for AngularJS
 * @version v0.0.5
 * @link https://github.com/felixdulfer/angular-iconic
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

if (typeof module !== 'undefined' &&
  typeof exports !== 'undefined' &&
  module.exports === exports) {
  module.exports = 'angular-iconic';
}

(function(window, angular, undefined) {
  // jshint latedef:false
  'use strict';

  AngularIconicDirective.$inject = ['$window'];
  function AngularIconicDirective($window) {
    var directiveDefinitionObject = {
      restrict: 'C',
      link: function(scope, elm) {
        $window.SVGInjector(elm, {
          evalScripts: 'once',
          pngFallback: '/assets/images/iconic/png'
        });
      }
    };

    return directiveDefinitionObject;
  }

  angular.module('angular-iconic.directive', []);
  angular.module('angular-iconic.directive')
    .directive('iconic', AngularIconicDirective);

  angular.module('angular-iconic', [
    'angular-iconic.directive'
  ]);

})(window, window.angular);
