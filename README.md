angular-iconic
==============

Simple [AngularJS](https://github.com/angular/angular.js) module for [Iconic](https://useiconic.com), inspired by [this Gist](https://gist.github.com/yoshokatana/1decf68176dc9452aa14).

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
<img data-src="/assets/images/lock.svg" 
  class="iconic iconic-sm" 
  data-state="unlocked" 
  alt="lock" />
```
