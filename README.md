angular-iconic
==============

Simple [AngularJS](https://github.com/angular/angular.js) module for [Iconic](https://useiconic.com), inspired by [this Gist](https://gist.github.com/yoshokatana/1decf68176dc9452aa14).

**Note#1:** You will need to have [Iconic](https://useiconic.com) or [Open Iconic](https://useiconic.com/open/). But this should work with regular SVG files as well.

**Note#2:** This project is mostly for fun and offers very limited (untested) part of what Iconic offers. Probably not suited for production environments. Feel free to fork and make it your own.

Install
=======

### Bower

``` bash
bower install angular-iconic
```

If you're using [Open Iconic](https://useiconic.com/open/), then you will also
want to install the SVGInjector.

``` bash
bower install svg-injector
```

If you're using [Iconic](https://useiconic.com), then you want to be sure to 
load `iconic.min.js` into your application as well.

Usage
=====

### Add `angular-iconic` as a dependency

```javascript
angular.module('app', ['angular-iconic']);
```

### Add an icon to your page

```html
<img data-src="/assets/images/iconic/smart/lock.svg" 
     class="iconic iconic-sm" 
     data-state="unlocked" 
     alt="lock">
```

Configuration
=====

### Configure SVG Injector

You can use either IconicJS or SVGInjector. Both Strings and Functions are OK.
The Provider will look for `window.IconicJS` and `window.SVGInjector` and use
whatever is available. If you want to override:

```javascript
angular.module('app', ['angular-iconic'])
  .config(function($iconicProvider) {
    
    // Either as String:
    $iconicProvider.injector('IconicJS');

    // Or as Function:
    $iconicProvider.injector(window.IconicJS);
  });
```

### Set a default path for relative `data-src`

```javascript
angular.module('app', ['angular-iconic'])
  .config(function($iconicProvider) {
    $iconicProvider.svgDir('/bower_components/open-iconic/svg');
  });
```

You can now use a path that is relative to the configured `svgDir`.

```html
<img data-src="lock.svg" 
     class="iconic iconic-sm" 
     data-state="unlocked" 
     alt="lock">
```

Please not that the path in this example is resolved to `'/bower_components/open-iconic/svg' + '/' + 'lock.svg'`. You'll wan't to consider some of the limitations this might bring you.

Note that you can still use _absolute_ `data-src` if you need to. Any relative `data-src` will need to be relative to the configured `svgDir`.

### Configure a path for `.png` fallback images

```javascript
angular.module('app', ['angular-iconic'])
  .config(function($iconicProvider) {
    $iconicProvider.svgDir('/bower_components/open-iconic/svg');
    $iconicProvider.pngFallback('/bower_components/open-iconic/png');
  });
```
