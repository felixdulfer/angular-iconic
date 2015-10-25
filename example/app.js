(function(window, angular, undefined) {
  // jshint latedef:false
  'use strict';

  DemoConfig.$inject = ['$iconicProvider'];
  function DemoConfig($iconicProvider) {
    $iconicProvider.svgDir('/bower_components/open-iconic/svg');
    $iconicProvider.pngFallback('/bower_components/open-iconic/png');
    $iconicProvider.injector('SVGInjector');
  }

  angular.module('app', [
      'angular-iconic',
      'Snippets',
      'SnippetsThemeBootstrapTabs'
    ])
    .config(DemoConfig);

})(window, window.angular);
