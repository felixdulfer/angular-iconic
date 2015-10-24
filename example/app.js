(function(window, angular, undefined) {
  // jshint latedef:false
  'use strict';

  DemoController.$inject = ['$scope'];
  function DemoController($scope) {


  }

  DemoConfig.$inject = ['$iconicProvider'];
  function DemoConfig($iconicProvider) {
    $iconicProvider.svgDir('/bower_components/open-iconic/svg');
    $iconicProvider.pngFallback('/bower_components/open-iconic/png');
  }

  angular.module('app', ['angular-iconic', 'Snippets', 'SnippetsThemeBootstrapTabs'])
    .config(DemoConfig)
    .controller('DemoController', DemoController)
    .directive('pre', function(){
      return {
        restrict: 'E',
        template: '<code ng-transclude><code>',
        transclude: true
      }
    });

})(window, window.angular);
