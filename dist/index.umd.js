/*!
 * vue-rokka-image-lazy v0.0.1-dev
 * (c) 
 * Released under the ISC License.
 */
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

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

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var index_umd = createCommonjsModule(function (module) {
  /*!
   * vue-rokka-image v0.0.10
   * (c) 
   * Released under the ISC License.
   */
  (function (factory) {
    
    factory();
  }((function () {
    function _typeof(obj) {
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function (obj) {
          return typeof obj;
        };
      } else {
        _typeof = function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
      }

      return _typeof(obj);
    }

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    }

    var sanitizedFilename = function sanitizedFilename(fileName) {
      var newFileName = fileName; // remove old file endings

      newFileName = newFileName.replace(/\.[^/.]{2,4}$/, ''); // according to the rokka team only point and slash are not allowed

      newFileName = newFileName.replace(/[.\\/]/g, '-');
      return newFileName;
    };
    var generalProps = {
      alt: {
        type: String,
        "default": null
      },
      title: {
        type: String,
        "default": null
      },
      org: {
        type: String,
        "default": ''
      },
      stack: {
        type: String,
        "default": 'dynamic'
      },
      hash: {
        type: String,
        "default": ''
      },
      format: {
        type: String,
        "default": 'jpg'
      },
      filename: {
        type: String,
        "default": 'image'
      },
      srcAttribute: {
        type: String,
        "default": 'src'
      },
      srcAdditionalAttribute: {
        type: String,
        "default": null
      },
      srcsetAttribute: {
        type: String,
        "default": 'srcset'
      },
      operations: {
        type: Array,
        "default": function _default() {
          return [];
        }
      },
      options: {
        type: Object,
        "default": function _default() {
          return {};
        }
      },
      variables: {
        type: Object,
        "default": function _default() {
          return {};
        }
      }
    }; // from an object to the rokka notation
    // input
    //       resize: {
    //         width: 300,
    //       },
    //       crop: {
    //         height: 200
    //       }
    // output
    //       resize-width-300--crop-height-200

    var flattenObject = function flattenObject(obj) {
      var toReturn = [];
      Object.keys(obj).forEach(function (key) {
        var val = obj[key]; // for objects we should do a recursion

        if (_typeof(val) === 'object') {
          var flatObject = flattenObject(val);

          for (var x in flatObject) {
            if (!Object.prototype.hasOwnProperty.call(flatObject, x)) continue; // are we itteration over a array or object

            if (Array.isArray(flatObject)) {
              toReturn.push("".concat(key, "-").concat(flatObject[x]));
            } else {
              toReturn.push("".concat(key, "-").concat(x, "-").concat(flatObject[x]));
            }
          }
        } else {
          toReturn.push("".concat(key, "-").concat(val));
        }
      });
      return toReturn;
    };
    var rokkaUrl = function rokkaUrl(props) {
      var org = props.org,
          stack = props.stack,
          variables = props.variables,
          options = props.options,
          filename = props.filename,
          format = props.format,
          hash = props.hash; // let operationsStr = null
      // if (operations && operations.length) {
      //   operationsStr = operations
      //     .reduce(operation => flattenObject(operation), [])
      //     .join('--')
      // }

      var variablesStr = flattenObject({
        v: variables
      }).join('--');
      var optionsStr = flattenObject({
        options: options
      }).join('--');
      var url = ["".concat(org, ".rokka.io/").concat(stack), // operationsStr,
      variablesStr, optionsStr, hash, "".concat(sanitizedFilename(filename), ".").concat(format)].join('/').replace(/\/{2,}/g, '/');
      return 'https://' + url;
    }; // https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge

    /**
     * Simple object check.
     * @param item
     * @returns {boolean}
     */

    var isObject = function isObject(item) {
      return item && _typeof(item) === 'object' && !Array.isArray(item);
    };
    /**
     * Deep merge two objects.
     * @param target
     * @param ...sources
     */

    var mergeDeep = function mergeDeep(target) {
      for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        sources[_key - 1] = arguments[_key];
      }

      if (!sources.length) return target;
      var source = sources.shift();

      if (isObject(target) && isObject(source)) {
        for (var key in source) {
          if (isObject(source[key])) {
            if (!target[key]) Object.assign(target, _defineProperty({}, key, {}));
            mergeDeep(target[key], source[key]);
          } else {
            Object.assign(target, _defineProperty({}, key, source[key]));
          }
        }
      }

      return mergeDeep.apply(void 0, [target].concat(sources));
    }; // https://stackoverflow.com/questions/40712399/deep-merging-nested-arrays

    var mergeArraysDeep = function mergeArraysDeep(arr1, arr2) {
      var unique = arr1.concat(arr2).reduce(function (accumulator, item) {
        if (accumulator[item.name]) {
          accumulator[item.name] = mergeDeep(accumulator[item.name], item);
        } else {
          accumulator[item.name] = item;
        }

        return accumulator;
      }, {});
      return Object.keys(unique).map(function (key) {
        return unique[key];
      });
    };
    var srcset = function srcset(item) {
      var currentPostfix = item.postfix;
      var currentOperations = item.operations;
      var currentOptions = item.options;
      var currentVariables = item.variables;
      var parrentPostfix = item.$parent && item.$parent.$props && item.$parent.$props.postfix;
      var parrentOperations = item.$parent && item.$parent.$props && item.$parent.$props.operations;
      var parrentOptions = item.$parent && item.$parent.$props && item.$parent.$props.options;
      var parrentVariables = item.$parent && item.$parent.$props && item.$parent.$props.variables;
      var maxItems = Math.max(Array.isArray(currentPostfix) ? currentPostfix.length : 0, Array.isArray(currentOperations) ? currentOperations.length : 0, Array.isArray(currentOptions) ? currentOptions.length : 0, Array.isArray(currentVariables) ? currentVariables.length : 0);

      if (item.$parent.$options._componentTag === 'rokka-picture') {
        maxItems = Math.max(maxItems, Array.isArray(parrentPostfix) ? parrentPostfix.length : 0, Array.isArray(parrentOperations) ? parrentOperations.length : 0, Array.isArray(parrentOptions) ? parrentOptions.length : 0, Array.isArray(parrentVariables) ? parrentVariables.length : 0);
      }

      var srcset = [];

      for (var i = 0; i < maxItems; i++) {
        // get the current props
        // depending if passed a obj or an array
        var postfix = Array.isArray(currentPostfix) ? currentPostfix[i] : currentPostfix;
        var operations = Array.isArray(currentOperations) && Array.isArray(currentOperations[0]) ? currentOperations[i] : currentOperations;
        var options = Array.isArray(currentOptions) ? currentOptions[i] : currentOptions;
        var variables = Array.isArray(currentVariables) ? currentVariables[i] : currentVariables;

        if (item.$parent.$options._componentTag === 'rokka-picture') {
          // get the parent props
          // depending if passed a obj or an array
          var pOperations = Array.isArray(parrentOperations) && Array.isArray(parrentOperations[0]) ? parrentOperations[i] : parrentOperations;
          var pOptions = Array.isArray(parrentOptions) ? parrentOptions[i] : parrentOptions;
          var pVariables = Array.isArray(parrentVariables) ? parrentVariables[i] : parrentVariables;
          operations = mergeArraysDeep(pOperations, operations);
          variables = mergeDeep(pVariables, variables);
          options = mergeDeep(pOptions, options);
        }

        if (options instanceof Array && options.length === 0) {
          options = {};
        }

        var url = rokkaUrl(Object.assign({}, item.$parent.$props, {}, item.$options.propsData, {
          operations: operations,
          variables: variables,
          options: options
        }));
        url = encodeURI(url) + (postfix ? ' ' + postfix : '');
        srcset.push(url);
      }

      return srcset.join(', ');
    };

    //
    var script = {
      props: Object.assign({}, generalProps, {
        postfix: {
          type: [Object, Array],
          "default": function _default() {
            return [];
          }
        },
        options: {
          type: [Object, Array],
          "default": function _default() {
            return [];
          }
        },
        srcAdditional: {
          type: String,
          "default": null
        }
      }),
      computed: {
        // returns srcAdditional if set, otherwise the link to the rokka URL
        // Is useful, when you want to set "src" to a loading image, which then later gets replaced
        // by a lazy loader and data-src(set)
        srcAdditionalComputed: function srcAdditionalComputed() {
          return this.srcAdditionalAttribute ? this.srcAdditional ? this.srcAdditional : this.rokkaSrc : null;
        },
        rokkaSrcset: function rokkaSrcset() {
          return srcset(this);
        },
        rokkaSrc: function rokkaSrc() {
          var currentOperations = this.operations;
          var currentOptions = this.options;
          var currentVariables = this.variables;
          var parrentOperations = this.$parent && this.$parent.$props && this.$parent.$props.operations;
          var parrentOptions = this.$parent && this.$parent.$props && this.$parent.$props.options;
          var parrentVariables = this.$parent && this.$parent.$props && this.$parent.$props.variables; // get the current props
          // depending if passed a obj or an array

          var operations = Array.isArray(currentOperations) && Array.isArray(currentOperations[0]) ? currentOperations[0] || {} : currentOperations;
          var options = Array.isArray(currentOptions) ? currentOptions[0] || {} : currentOptions;
          var variables = Array.isArray(currentVariables) ? currentVariables[0] || {} : currentVariables;
          var currentProps = this.$props;

          if (this.$parent.$options._componentTag === 'rokka-picture') {
            // get the parent props
            // depending if passed a obj or an array
            var pOperations = Array.isArray(parrentOperations) && Array.isArray(parrentOperations[0]) ? parrentOperations[0] : parrentOperations;
            var pOptions = Array.isArray(parrentOptions) ? parrentOptions[0] : parrentOptions;
            var pVariables = Array.isArray(parrentVariables) ? parrentVariables[0] : parrentVariables;
            operations = mergeArraysDeep(pOperations, operations);
            variables = mergeDeep(pVariables, variables);
            options = mergeDeep(pOptions, options); //we have the default props already from the parent in this case, so just use the added ones

            currentProps = this.$options.propsData;
          }

          var url = rokkaUrl(Object.assign({}, this.$parent.$props, {}, currentProps, {
            operations: operations,
            variables: variables,
            options: options
          }));
          return url;
        }
      }
    };

    function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
        if (typeof shadowMode !== 'boolean') {
            createInjectorSSR = createInjector;
            createInjector = shadowMode;
            shadowMode = false;
        }
        // Vue.extend constructor export interop.
        const options = typeof script === 'function' ? script.options : script;
        // render functions
        if (template && template.render) {
            options.render = template.render;
            options.staticRenderFns = template.staticRenderFns;
            options._compiled = true;
            // functional template
            if (isFunctionalTemplate) {
                options.functional = true;
            }
        }
        // scopedId
        if (scopeId) {
            options._scopeId = scopeId;
        }
        let hook;
        if (moduleIdentifier) {
            // server build
            hook = function (context) {
                // 2.3 injection
                context =
                    context || // cached call
                        (this.$vnode && this.$vnode.ssrContext) || // stateful
                        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
                // 2.2 with runInNewContext: true
                if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                    context = __VUE_SSR_CONTEXT__;
                }
                // inject component styles
                if (style) {
                    style.call(this, createInjectorSSR(context));
                }
                // register component module identifier for async chunk inference
                if (context && context._registeredComponents) {
                    context._registeredComponents.add(moduleIdentifier);
                }
            };
            // used by ssr in case component is cached and beforeCreate
            // never gets called
            options._ssrRegister = hook;
        }
        else if (style) {
            hook = shadowMode
                ? function (context) {
                    style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
                }
                : function (context) {
                    style.call(this, createInjector(context));
                };
        }
        if (hook) {
            if (options.functional) {
                // register for functional component in vue file
                const originalRender = options.render;
                options.render = function renderWithStyleInjection(h, context) {
                    hook.call(context);
                    return originalRender(h, context);
                };
            }
            else {
                // inject component registration as beforeCreate hook
                const existing = options.beforeCreate;
                options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
            }
        }
        return script;
    }

    const isOldIE = typeof navigator !== 'undefined' &&
        /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    /* script */
    var __vue_script__ = script;
    /* template */

    var __vue_render__ = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('img', _vm._b({
        "class": 'rokka--attr-' + _vm.srcAttribute,
        attrs: {
          "alt": _vm.alt,
          "title": _vm.title
        }
      }, "img", _vm._d({}, [_vm.srcAttribute, _vm.rokkaSrc, _vm.srcsetAttribute, _vm.rokkaSrcset, _vm.srcAdditionalAttribute, _vm.srcAdditionalComputed])));
    };

    var __vue_staticRenderFns__ = [];
    /* style */

    var __vue_inject_styles__ = undefined;
    /* scoped */

    var __vue_scope_id__ = undefined;
    /* module identifier */

    var __vue_module_identifier__ = undefined;
    /* functional template */

    var __vue_is_functional_template__ = false;
    /* style inject */

    /* style inject SSR */

    /* style inject shadow dom */

    var RokkaImg = normalizeComponent({
      render: __vue_render__,
      staticRenderFns: __vue_staticRenderFns__
    }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

    //
    var script$1 = {
      props: Object.assign({}, generalProps)
    };

    /* script */
    var __vue_script__$1 = script$1;
    /* template */

    var __vue_render__$1 = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "rokka-picture"
      }, [_c('picture', [_vm._t("default")], 2)]);
    };

    var __vue_staticRenderFns__$1 = [];
    /* style */

    var __vue_inject_styles__$1 = undefined;
    /* scoped */

    var __vue_scope_id__$1 = undefined;
    /* module identifier */

    var __vue_module_identifier__$1 = undefined;
    /* functional template */

    var __vue_is_functional_template__$1 = false;
    /* style inject */

    /* style inject SSR */

    /* style inject shadow dom */

    var RokkaPicture = normalizeComponent({
      render: __vue_render__$1,
      staticRenderFns: __vue_staticRenderFns__$1
    }, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

    //
    var script$2 = {
      props: Object.assign({}, generalProps, {
        media: {
          type: String,
          "default": ''
        },
        postfix: {
          type: [Object, Array],
          "default": function _default() {
            return [];
          }
        },
        options: {
          type: [Object, Array],
          "default": function _default() {
            return [];
          }
        },
        variables: {
          type: [Object, Array],
          "default": function _default() {
            return [];
          }
        }
      }),
      computed: {
        srcset: function srcset$1() {
          return srcset(this);
        }
      }
    };

    /* script */
    var __vue_script__$2 = script$2;
    /* template */

    var __vue_render__$2 = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('source', {
        attrs: {
          "media": _vm.media,
          "srcset": _vm.srcset
        }
      });
    };

    var __vue_staticRenderFns__$2 = [];
    /* style */

    var __vue_inject_styles__$2 = undefined;
    /* scoped */

    var __vue_scope_id__$2 = undefined;
    /* module identifier */

    var __vue_module_identifier__$2 = undefined;
    /* functional template */

    var __vue_is_functional_template__$2 = false;
    /* style inject */

    /* style inject SSR */

    /* style inject shadow dom */

    var RokkaSource = normalizeComponent({
      render: __vue_render__$2,
      staticRenderFns: __vue_staticRenderFns__$2
    }, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);

    module.exports = {
      RokkaImg: RokkaImg,
      RokkaPicture: RokkaPicture,
      RokkaSource: RokkaSource,
      rokkaUrl: rokkaUrl,
      "default": {
        install: function install(Vue) {
          Vue.component('rokka-img', RokkaImg);
          Vue.component('rokka-picture', RokkaPicture);
          Vue.component('rokka-source', RokkaSource);
        }
      }
    };

  })));
  });
  var index_umd_1 = index_umd.RokkaImg;
  var index_umd_2 = index_umd.RokkaPicture;
  var index_umd_3 = index_umd.RokkaSource;
  var index_umd_4 = index_umd.rokkaUrl;

  /*! lozad.js - v1.14.0 - 2019-10-19
  * https://github.com/ApoorvSaxena/lozad.js
  * Copyright (c) 2019 Apoorv Saxena; Licensed MIT */


  /**
   * Detect IE browser
   * @const {boolean}
   * @private
   */
  const isIE = typeof document !== 'undefined' && document.documentMode;

  const defaultConfig = {
    rootMargin: '0px',
    threshold: 0,
    load(element) {
      if (element.nodeName.toLowerCase() === 'picture') {
        const img = document.createElement('img');
        if (isIE && element.getAttribute('data-iesrc')) {
          img.src = element.getAttribute('data-iesrc');
        }

        if (element.getAttribute('data-alt')) {
          img.alt = element.getAttribute('data-alt');
        }

        element.append(img);
      }

      if (element.nodeName.toLowerCase() === 'video' && !element.getAttribute('data-src')) {
        if (element.children) {
          const childs = element.children;
          let childSrc;
          for (let i = 0; i <= childs.length - 1; i++) {
            childSrc = childs[i].getAttribute('data-src');
            if (childSrc) {
              childs[i].src = childSrc;
            }
          }

          element.load();
        }
      }

      if (element.getAttribute('data-src')) {
        element.src = element.getAttribute('data-src');
      }

      if (element.getAttribute('data-srcset')) {
        element.setAttribute('srcset', element.getAttribute('data-srcset'));
      }

      if (element.getAttribute('data-background-image')) {
        element.style.backgroundImage = `url('${element.getAttribute('data-background-image').split(',').join('\'),url(\'')}')`;
      } else if (element.getAttribute('data-background-image-set')) {
        const imageSetLinks = element.getAttribute('data-background-image-set').split(',');
        let firstUrlLink = (imageSetLinks[0].substr(0, imageSetLinks[0].indexOf(' ')) || imageSetLinks[0]); // Substring before ... 1x
        firstUrlLink = firstUrlLink.indexOf('url(') === -1 ? `url(${firstUrlLink})` : firstUrlLink;
        if (imageSetLinks.length === 1) {
          element.style.backgroundImage = firstUrlLink;
        } else {
          element.setAttribute('style', (element.getAttribute('style') || '') + `background-image: ${firstUrlLink}; background-image: -webkit-image-set(${imageSetLinks}); background-image: image-set(${imageSetLinks})`);
        }
      }

      if (element.getAttribute('data-toggle-class')) {
        element.classList.toggle(element.getAttribute('data-toggle-class'));
      }
    },
    loaded() {}
  };

  function markAsLoaded(element) {
    element.setAttribute('data-loaded', true);
  }

  const isLoaded = element => element.getAttribute('data-loaded') === 'true';

  const onIntersection = (load, loaded) => (entries, observer) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0 || entry.isIntersecting) {
        observer.unobserve(entry.target);

        if (!isLoaded(entry.target)) {
          load(entry.target);
          markAsLoaded(entry.target);
          loaded(entry.target);
        }
      }
    });
  };

  const getElements = (selector, root = document) => {
    if (selector instanceof Element) {
      return [selector]
    }

    if (selector instanceof NodeList) {
      return selector
    }

    return root.querySelectorAll(selector)
  };

  function lozad (selector = '.lozad', options = {}) {
    const {root, rootMargin, threshold, load, loaded} = Object.assign({}, defaultConfig, options);
    let observer;

    if (typeof window !== 'undefined' && window.IntersectionObserver) {
      observer = new IntersectionObserver(onIntersection(load, loaded), {
        root,
        rootMargin,
        threshold
      });
    }

    return {
      observe() {
        const elements = getElements(selector, root);

        for (let i = 0; i < elements.length; i++) {
          if (isLoaded(elements[i])) {
            continue
          }

          if (observer) {
            observer.observe(elements[i]);
            continue
          }

          load(elements[i]);
          markAsLoaded(elements[i]);
          loaded(elements[i]);
        }
      },
      triggerLoad(element) {
        if (isLoaded(element)) {
          return
        }

        load(element);
        markAsLoaded(element);
        loaded(element);
      },
      observer
    }
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
    name: 'RokkaImgLazy',
    components: {
      RokkaImg: index_umd_1
    },
    props: Object.assign({}, index_umd_1.props, {
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
          return [{}, {
            dpr: '2'
          }];
        }
      },
      operations: {
        type: [Object, Array],
        "default": function _default() {
          return [];
        }
      },
      loading: {
        type: String,
        "default": null
      }
    }),
    computed: {
      srcAdditionalComputed: function srcAdditionalComputed() {
        if (!this.loading || this.isCached) {
          return 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
        }

        window._imageCache.add(this.rokkaRenderUrl);

        return this.loading;
      },
      isCached: function isCached() {
        return window._imageCache.has(this.rokkaRenderUrl);
      },
      rokkaRenderUrl: function rokkaRenderUrl() {
        return index_umd_4({
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
    created: function created() {
      if (!window._imageCache) {
        window._imageCache = new ImageCache({
          max: 200
        });
      }
    },
    updated: function updated() {
      window._lozadObserver.observe();
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

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css = "";
  styleInject(css);

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      const options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      let hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              const originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              const existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  const isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

  /* script */
  var __vue_script__ = script;
  /* template */

  var __vue_render__ = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('rokka-img', {
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

  var __vue_scope_id__ = "data-v-744333b7";
  /* module identifier */

  var __vue_module_identifier__ = undefined;
  /* functional template */

  var __vue_is_functional_template__ = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var RokkaImgLazy = normalizeComponent({
    render: __vue_render__,
    staticRenderFns: __vue_staticRenderFns__
  }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

  module.exports = {
    RokkaImgLazy: RokkaImgLazy,
    "default": {
      install: function install(Vue) {
        Vue.component('rokka-img-lazy', RokkaImgLazy);
      }
    }
  };

})));
