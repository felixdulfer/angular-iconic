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

  /** Gets the first available injector */
  function autoDetectInjector() {
    var injector;
    if (window.IconicJS) {
      injector = 'IconicJS';
    } else if (window.SVGInjector) {
      injector = 'SVGInjector';
    }
    return injector;
  }

  /** Instantiates the Injector */
  function getInjector(injector) {
    if (injector === 'IconicJS') {
      injector = new window[injector]().inject;
    } else {
      injector = window[injector];
    }
    return injector;
  }

  $AngularIconicProvider.$inject = [];
  function $AngularIconicProvider() {

    /** @type {String} Default location for .svg files */
    var svgDir = void 0;

    /** @type {String} Default location for .png fallback images */
    var pngFallback = void 0;

    /** @type {String} (IconicJS|SVGInjector) */
    var injector = autoDetectInjector();

    /** @type {Boolean} Inject icons requires $apply? */
    var invokeApply = false;

    /** @type {Boolean} evalScripts option from Iconc */
    var evalScripts = 'once';

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

    /** Getter/Setter for invoking scope.$apply */
    this.invokeApply = function(value) {
      if (typeof value !== 'undefined') {
        invokeApply = value;
      }
      return invokeApply;
    };

    /** Getter/Setter for evalScripts */
    this.evalScripts = function(value) {
      if (typeof value !== 'undefined') {
        evalScripts = value;
      }
      return evalScripts;
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

        /** Getter for injector function */
        get injector() {
          return getInjector(injector);
        },

        /** Getter for invokeApply option */
        get invokeApply() {
          return invokeApply;
        },

        /** Getter for evalScripts option */
        get evalScripts() {
          return evalScripts;
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
    var $angularIconicDirectiveDefinitionObject = {
      restrict: 'AC',
      link: function(scope, elm, attrs) {

        var src,
          injectorOptions = {},
          iconic = $iconic.injector,
          svgDir = attrs.svgDir || $iconic.svgDir,
          invokeApply = $iconic.invokeApply || attrs.invokeApply;

        // Make sure that the iconic class is always set
        // This is useful in cases where the Directive is used with attribute
        elm.addClass('iconic');

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
        if (svgDir && src.substr(0,1) !== '/') {

          // Strip trailing `/` and construct the new absolute path
          src = (svgDir).replace(/\/$/, '') + '/' + src;
          elm.attr('data-src', src);
        }

        // Should we run any script blocks found in the SVG?
        injectorOptions.evalScripts = $iconic.evalScripts;

        // The directory where fallback PNGs are located for use if the browser
        // doesn't support SVG. Only used if the option is set in the Provider.
        injectorOptions.pngFallback = $iconic.pngFallback ?
          $iconic.pngFallback :
          void 0;

        /** Injects SVG */
        function inject() {
          iconic(elm, injectorOptions);
          return;
        }

        // Inject the SVG – Uses timeout to safely invoke `scope.$apply()` if
        // this preference is set in the Provider or the elm attributes.
        if (invokeApply) {
          $timeout(inject, true);
        } else {
          inject();
        }
      }
    };

    return $angularIconicDirectiveDefinitionObject;
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
