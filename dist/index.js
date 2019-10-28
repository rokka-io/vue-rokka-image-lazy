/*!
 * vue-rokka-image-lazy v0.0.1
 * (c) 
 * Released under the ISC License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var vueRokkaImage = require('vue-rokka-image');
var lozad = _interopDefault(require('lozad'));
var styleInject = _interopDefault(require('../node_modules/style-inject/dist/style-inject.es.js'));
var __vue_normalize__ = _interopDefault(require('../node_modules/rollup-plugin-vue/runtime/normalize.js'));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var ImageCache =
/*#__PURE__*/
function () {
  function ImageCache(_ref) {
    var max = _ref.max;

    _classCallCheck(this, ImageCache);

    this.options = {
      max: max || 100
    };
    this._caches = [];
  }

  _createClass(ImageCache, [{
    key: "has",
    value: function has(key) {
      return this._caches.indexOf(key) > -1;
    }
  }, {
    key: "add",
    value: function add(key) {
      if (this.has(key)) return;

      this._caches.push(key);

      if (this._caches.length > this.options.max) {
        this.free();
      }
    }
  }, {
    key: "free",
    value: function free() {
      this._caches.shift();
    }
  }]);

  return ImageCache;
}();

var script = {
  name: 'RokkaImageLazy',
  components: {
    RokkaImageImg: vueRokkaImage.RokkaImageImg
  },
  props: Object.assign({}, vueRokkaImage.RokkaImageImg.props, {
    srcAttribute: {
      type: String,
      "default": 'data-src'
    },
    srcsetAttribute: {
      type: String,
      "default": 'data-srcset'
    },
    postfix: {
      type: [Object, Array],
      "default": function _default() {
        return ['1x', '2x'];
      }
    },
    options: {
      type: [Object, Array],
      "default": function _default() {
        return [{
          dpr: '1'
        }, {
          dpr: '2'
        }];
      }
    },
    loading: {
      type: String,
      "default": null
    }
  }),
  created: function created() {
    if (!window._imageCache) {
      window._imageCache = new ImageCache({
        max: 200
      });
    }
  },
  computed: {
    srcAdditionalComputed: function srcAdditionalComputed() {
      if (!this.loading || this.isCached) {
        return "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
      }

      window._imageCache.add(this.rokkaRenderUrl);

      return this.loading;
    },
    isCached: function isCached() {
      return window._imageCache.has(this.rokkaRenderUrl);
    },
    rokkaRenderUrl: function rokkaRenderUrl() {
      return vueRokkaImage.buildRokkaUrl({
        org: this.org,
        hash: this.hash,
        stack: this.stack,
        format: this.format,
        filename: this.filename,
        options: Array.isArray(this.options) ? this.options[0] : this.options,
        variables: Array.isArray(this.variables) ? this.variables[0] : this.variables
      });
    }
  },
  mounted: function mounted() {
    // We initialize Lozad.js on the root
    // element of our component.
    if (!window._lozadObserver) {
      window._lozadObserver = lozad('.rokka--attr-data-src', {
        rootMargin: '200px'
      });
    }

    window._lozadObserver.observe();
  }
};

var css = "";
styleInject(css);

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('rokka-image', {
    key: _vm.hash,
    attrs: {
      "org": _vm.org,
      "hash": _vm.hash,
      "filename": _vm.filename,
      "stack": _vm.stack,
      "format": _vm.format,
      "alt": _vm.alt,
      "srcset-attribute": "data-srcset",
      "src-attribute": "data-src",
      "src-additional-attribute": "src",
      "src-additional": _vm.srcAdditionalComputed,
      "postfix": _vm.postfix,
      "options": _vm.options
    }
  });
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = "data-v-d1a94f48";
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var RokkaImageImgLazy = __vue_normalize__({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

var index = {
  install: function install(Vue, options) {
    // Let's register our component globally
    // https://vuejs.org/v2/guide/components-registration.html
    Vue.component("rokka-image-img-lazy", RokkaImageImgLazy);
  }
};

exports.RokkaImageImgLazy = RokkaImageImgLazy;
exports.default = index;
