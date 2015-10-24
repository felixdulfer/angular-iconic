angular-iconic
==============

Simple [AngularJS](https://github.com/angular/angular.js) module for [Iconic](https://useiconic.com), inspired by [this Gist](https://gist.github.com/yoshokatana/1decf68176dc9452aa14).

**Note:** You will need to have [Iconic](https://useiconic.com) or [Open Iconic](https://useiconic.com/open/). But this should work with regular SVG files as well.

Install
=======

### Bower

``` bash
bower install angular-iconic
```

Usage
=====

### Add `angular-iconic` as a dependency

```javascript
angular.module('app', [
  'angular-iconic'
]);
```

### Add an icon to your page

```html
<img data-src="/assets/images/iconic/smart/lock.svg" 
     class="iconic iconic-sm" 
     data-state="unlocked" 
     alt="lock" />
```

Configuration
=====

### Set a default path for relative `src`

```javascript
angular.module('app', [
  'angular-iconic'
])
.config(function($iconicProvider) {
  $iconicProvider.svgDir('/bower_components/open-iconic/svg');
});
```

You can now use a path that is relative to the `svgDir`.

```html
<img data-src="lock.svg" 
     class="iconic iconic-sm" 
     data-state="unlocked" 
     alt="lock" />
```

### Configure a path for `.png` fallback images

```javascript
angular.module('app', [
  'angular-iconic'
])
.config(function($iconicProvider) {
  $iconicProvider.svgDir('/bower_components/open-iconic/svg');
  $iconicProvider.pngFallback('/bower_components/open-iconic/png');
});
```
