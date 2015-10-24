/**
 * Iconic for AngularJS
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

  $AngularIconicProvider.$inject = [];
  function $AngularIconicProvider() {

    /** @type {String} Default location for .svg files */
    var svgDir = void 0;

    /** @type {String} Default location for .png fallback images */
    var pngFallback = void 0;

    /** Getter/Setter for default .svg files */
    this.svgDir = function(value) {
      if (typeof value !== 'undefined') {
        svgDir = value;
      }
      return value;
    };

    /** Getter/Setter for default location of .png fallback images */
    this.pngFallback = function(value) {
      if (typeof value !== 'undefined') {
        pngFallback = value;
      }
      return value;
    };

    /** Public API */
    this.$get = function() {
      return {

        /** Getter for the configured dir for .svg files */
        get svgDir() {
          return svgDir;
        },

        /** Getter for the configured dir for .png fallback images */
        get pngFallback() {
          return pngFallback;
        }
      };
    };
  }

  $AngularIconicDirective.$inject = ['$window', '$iconic', '$parse'];
  function $AngularIconicDirective($window, $iconic, $parse) {
    var directiveDefinitionObject = {
      restrict: 'C',
      link: function(scope, elm/*, attrs*/) {

        // Grab the raw src attribute – We'll want to modify it for some
        var src = elm.attr('data-src');

        // Ugly hack to use .svg or an expression in the data-src attribute
        // There is probably a better ("angular") way to do this but this does
        // the trick for now...
        if (!/.svg$/.test(src)) {
          src = $parse(src)(scope);
          elm.attr('data-src', src);
        }

        // if the path has no leading `/`, then we'll assume it is relative.
        // For ease of use we'll make it relative to the svgDir.
        // This should only change paths if the svgDir is actually configured.
        if ($iconic.svgDir && src.substr(0,1) !== '/') {
          src = $iconic.svgDir + '/' + src;
          elm.attr('data-src', src);
        }

        /** @type {Object} Options for SVG Injector */
        var options = {
          evalScripts: 'once'
        };

        // If PNG fallbacks are configured then add this to the options
        if ($iconic.pngFallback) {
          options.pngFallback = $iconic.pngFallback;
        }

        // Inject the SVG
        $window.SVGInjector(elm, options);
      }
    };

    return directiveDefinitionObject;
  }

  angular.module('angular-iconic.provider', [])
    .provider('$iconic', $AngularIconicProvider);

  angular.module('angular-iconic.directive', [])
    .directive('iconic', $AngularIconicDirective);

  angular.module('angular-iconic', [
    'angular-iconic.provider',
    'angular-iconic.directive'
  ]);

})(window, window.angular);
