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
load `iconic.min.js` into your application. You don't need `svg-injector` in 
this case.

Usage
=====

### Add `angular-iconic` as a dependency

```javascript
angular.module('app', ['angular-iconic']);
```

### Add an icon to your page

Two things are important:

* The `data-src` attribute – Most point to an svg file (also takes expressions).
* The `iconic` class/attribute – This enables the Directive on your element.

Everything else is optional. The basic principle here is that we'll try to 
follow the normal Iconic way of doing things. 

```html
<!-- Using data-src attribute (The Iconic Way) -->
<img data-src="/bower_components/open-iconic/svg/lock-locked.svg" 
     class="iconic" 
     alt="lock">
```

But we'll also enable some simple features to get the most out of the 
integration with AngularJS. This makes the `iconic` class optional and it even
makes the `data-src` attribute optional. The Directive will automatically add
the required attributes back in so that IconicJS behaves like it normally would.

```html
<!-- Using iconic attribute (The Hybrid way) -->
<img iconic 
     data-src="/bower_components/open-iconic/svg/lock-locked.svg" 
     alt="lock">

<!-- Using just the iconic attribute (The angular-iconic way) -->
<img iconic="/bower_components/open-iconic/svg/lock-locked.svg" 
     alt="lock">
```

If you want the images to show up even without JS at your disposal then you can
use the regular `src` attribute. This won't really do you much good in most 
cases but it is available:

```html
<!-- Using src attribute (the not advised way) -->
<img src="/bower_components/open-iconic/svg/lock-locked.svg" 
     class="iconic" 
     alt="lock">
```

Configuration
=====

This component comes with a couple of configuration options available through 
the `$iconicProvider`. For most of these options there's also a local override
using the `img` element attributes.

### `svgDir()`: Set a default path prefix for relative paths

Don't like long paths in your `data-src` attributes? Want to just copy & paste 
the examples from the docs of https://useiconic.com? This option allows all 
relative paths to become relative to the same path on your server:

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

If you don't need/want to use the Provider then you can overide the relative
path in the element attributes as well:

```html
<img data-src="lock.svg" 
     svg-dir="/bower_components/open-iconic/svg"
     class="iconic iconic-sm" 
     data-state="unlocked" 
     alt="lock">
```

Please not that the path in this example is resolved to an absolute path, like `'/bower_components/open-iconic/svg' + '/' + 'lock.svg'`. You'll wan't to consider some of the limitations this might bring you.

Note that you can still use _absolute_ `data-src` if you need to. Any relative `data-src` will need to be relative to the configured `svgDir`. Absolute paths will remain untouched.

### `pngFallback()`: Configure a path for PNG fallback images

```javascript
angular.module('app', ['angular-iconic'])
  .config(function($iconicProvider) {
    $iconicProvider.pngFallback('/bower_components/open-iconic/png');
  });
```

### `injector()`: Configure SVG Injector

You can use either 'IconicJS' or 'SVGInjector'.The Provider will look for 
`window.IconicJS` and `window.SVGInjector` and use whatever is available. 
If you want to override:

```javascript
angular.module('app', ['angular-iconic'])
  .config(function($iconicProvider) {    
    $iconicProvider.injector('IconicJS');
  });
```

### `invokeApply()`

In some cases you may want to invoke `scope.$apply()` to get around certain
AngularJS pitfalls. You can do this via the Provider:

```javascript
angular.module('app', ['angular-iconic'])
  .config(function($iconicProvider) {    
    $iconicProvider.invokeApply(true);
  });
```

Or you can do this via the element's attributes, using any truthy value:

```html
<img data-src="lock.svg" 
     class="iconic iconic-sm" 
     data-state="unlocked" 
     alt="lock"
     invoke-apply="true" >
```

Please note that the default is `false` for this option because if you have a 
page with many icons then this will also invoke many additional digests. I'm
sure this is not good for performance.

### `evalScripts()`

See [SVGInjector options](https://github.com/iconic/SVGInjector#options) for
more information.

```javascript
angular.module('app', ['angular-iconic'])
  .config(function($iconicProvider) {    
    $iconicProvider.evalScripts('once');
  });
```

Default value is set to `'once'`.
