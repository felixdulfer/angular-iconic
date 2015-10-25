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

    /** @type {String} Function name of the injector (IconicJS|SVGInjector) */
    var injector = 'SVGInjector';

    /** Getter/Setter for default .svg files */
    this.svgDir = function(value) {
      if (typeof value !== 'undefined') {
        svgDir = value;
      }
      return svgDir;
    };

    /** Getter/Setter for default location of .png fallback images */
    this.pngFallback = function(value) {
      if (typeof value !== 'undefined') {
        pngFallback = value;
      }
      return pngFallback;
    };

    /** Getter/Setter for injector function to use */
    this.injector = function(value) {
      if (typeof value !== 'undefined') {
        injector = value;
      }
      return injector;
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
        },

        /** Getter for the name of the injector function */
        get injector() {
          return injector;
        }
      };
    };
  }

  $AngularIconicDirective.$inject = [
    '$window',
    '$iconic',
    '$parse',
    '$timeout'
  ];
  function $AngularIconicDirective($window, $iconic, $parse, $timeout) {
    var directiveDefinitionObject = {
      restrict: 'C',
      link: function(scope, elm/*, attrs*/) {

        var src,
          injectorOptions = {},
          injector,
          iconic;

        // Grab the raw src attribute – We'll want to modify it for some
        src = elm.attr('data-src');

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

        // Should we run any script blocks found in the SVG?
        injectorOptions.evalScripts = 'once';

        // The directory where fallback PNGs are located for use if the browser
        // doesn't support SVG. Only used if the option is set in the Provider.
        injectorOptions.pngFallback = $iconic.pngFallback ?
          $iconic.pngFallback :
          void 0;

        // Get the injector
        injector = $iconic.injector;

        // Get iconic – The docs on both injectors seem to be different.
        // IconicJS seems to get the injector via invoking the function and the
        // SVGInjector just provides the SVGInjector itself?
        iconic = injector === 'IconicJS' ?
          new $window[injector]() :
          $window[injector];

        /** Injects SVG */
        function inject() {
          iconic(elm, injectorOptions);
          return;
        }

        // Inject the SVG – Uses timeout to safely invoke `scope.$apply()`
        $timeout(inject, true);
      }
    };

    return directiveDefinitionObject;
  }

  // Register the Provider Module
  angular.module('angular-iconic.provider', [])
    .provider('$iconic', $AngularIconicProvider);

  // Register the Directive Module
  angular.module('angular-iconic.directive', [])
    .directive('iconic', $AngularIconicDirective);

  // Register the Angular Iconic Module
  angular.module('angular-iconic', [
    'angular-iconic.provider',
    'angular-iconic.directive'
  ]);

})(window, window.angular);
