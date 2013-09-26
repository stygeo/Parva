// Soon to be minimalistic drop in replacement for jQuery

var Parva = (function() {
  var $, emptyArray = [];

  $ = function(selector) {
    return $.init(selector);
  };

  // Prepare the extend function.
  $.extend = function(object, module){
    for(var key in module) {
      if(module.hasOwnProperty(key)) {
        object[key] = module[key];
      }
    }

    return $;
  };

  // Now extend Parva
  $.extend($, {
    fn: {
      // Because a collection is acts as an array
      forEach: emptyArray.forEach,
      reduce: emptyArray.reduce,
      push: emptyArray.push,
      sort: emptyArray.sort,
      indexOf: emptyArray.indexOf,
      concat: emptyArray.concat,
    },

    P: function(dom, selector) {
      dom = dom || [];
      dom.__proto__ = $.fn;
      dom.selector = selector;

      return dom;
    },

    // Collection init function
    init: function(selector) {
      var dom;

      if(!selector) return $.P();
      else {
        if($.isObject(selector)) {
          dom = [selector]; selector = null;
        } else dom = $.querySelector(selector);
      }

      // Return a collection
      return this.P(dom, selector);
    },

    // We supply our own query selector, so we may overwrite it if we need to extend it.
    querySelector: function(selector) {
      return document.querySelectorAll(selector);
    },

    // Typeof checking functions
    isObject: function(o) { return typeof(o) === 'object'; },
    isFunction: function(o) { return typeof(o) === 'function'; },
    isArray: function(o) { return o instanceof Array; },

    // Create an array out of object if it isn't already
    makeArray: function(object) {
      if($.isArray(object)) return object;
      else {
        return [object];
      }
    },

    each: function(array, callback) {
      for(var i = 0; i < array.length; i++) {
        callback.call(array[i], array[i]);
      }

      return $;
    }
  });


  return $;
})();

;(function($) {
  // Extend the collection functions.
  $.extend($.fn, {
    // Set the HTML of the element. Assumes the first element
    html: function(html) {
      var element = this[0];

      if(!html) {
        return element.innerHTML;
      } else {
        element.innerHTML = html;
      }

      return $(element);
    },

    // Add CSS class to collection
    addClass: function(classes) {
      if(!$.isArray(classes)) classes = classes.split(" ");

      this.forEach(function(element) {
        $.each(classes, function(c) {
          element.classList.add(c);
        });
      });

      return this;
    },

    // Remove CSS class from selection
    removeClass: function(classes) {
      if(!$.isArray(classes)) classes = classes.split(" ");

      this.forEach(function(element) {
        $.each(classes, function(c) {
          element.classList.remove(c);
        });
      });

      return this;
    },

    // Each element in the collection
    each: function(callback) {
      $.each(this, callback);

      return this;
    },
  });
})(Parva);

window.Parva = Parva;
'$' in window || (window.$ = Parva);
