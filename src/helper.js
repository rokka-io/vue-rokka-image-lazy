import { rokkaUrl as buildRokkaUrl } from 'vue-rokka-image'
import { generalProps } from 'vue-rokka-image'
import lozad from 'lozad'

export function createCache() {
  if (!window._vueRokkaImageCache) {
    window._vueRokkaImageCache = new ImageCache({ max: 200 })
  }
}

export function observeLozad() {
  window._vueRokkaLozadObserver.observe()
}

export function initLozad(rootMargin = '200px') {
  // We initialize Lozad.js on the root
  // element of our component.
  if (!window._vueRokkaLozadObserver) {
    window._vueRokkaLozadObserver = lozad('.rokka--attr-data-src', {
      rootMargin,
      loaded: el => {
        window._vueRokkaImageCache.add(el.getAttribute('data-cache'))
      },
    })
  }
  observeLozad()
}

export const computedProperties = {
  _org() {
    return this.org || this.$parent.org
  },
  _hash() {
    return this.hash || this.$parent.hash
  },
  _stack() {
    return this.stack || this.$parent.stack
  },
  _sourceimage() {
    return this.sourceimage || this.$parent.sourceimage
  },
  _format() {
    return this.format || this.$parent.format
  },
  _alt() {
    return this.alt || this.$parent.alt
  },
  _title() {
    return this.title || this.$parent.title
  },
  _postfix() {
    return this.postfix || this.$parent.postfix
  },

  _filename() {
    if (this.filename !== generalProps.filename.default && this.filename) {
      return this.filename
    }
    if (this.$parent.filename) {
      return this.$parent.filename
    }
    return this.filename
  },
  _options() {
    return this.options || this.$parent.options
  },
  _optionsFirst() {
    return (
      (Array.isArray(this.options) ? this.options[0] : this.options) ||
      (Array.isArray(this.$parent.options)
        ? this.$parent.options[0]
        : this.$parent.options)
    )
  },
  _operationsFirst() {
    const thOperations =
      Array.isArray(this.operations) && Array.isArray(this.operations[0])
        ? this.operations[0]
        : this.operations
    if (thOperations) {
      return thOperations
    }
    const parent = this.$parent
    return Array.isArray(parent.operations) &&
      Array.isArray(parent.operations[0])
      ? parent.operations[0]
      : parent.operations
  },
  _variablesFirst() {
    return (
      (Array.isArray(this.variables) ? this.variables[0] : this.variables) ||
      (Array.isArray(this.$parent.variables)
        ? this.$parent.variables[0]
        : this.$parent.variables)
    )
  },
  _variables() {
    return this.variables || this.$parent.variables
  },
  srcAdditionalComputed() {
    if (!this.loading || this.isCached) {
      return 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
    }
    return this.loading
  },

  isCached() {
    return window._vueRokkaImageCache.has(this.rokkaRenderUrl)
  },

  rokkaRenderUrl() {
    return buildRokkaUrl({
      org: this._org,
      hash: this._hash,
      stack: this._stack,
      format: this._format,
      filename: this._filename,
      operations: this._operationsFirst,
      options: this._optionsFirst,
      variables: this._variablesFirst,
    })
  },
}

class ImageCache {
  constructor({ max }) {
    this.options = {
      max: max || 100,
    }
    this._caches = []
  }

  has(key) {
    return this._caches.indexOf(key) > -1
  }

  add(key) {
    if (this.has(key)) return
    this._caches.push(key)
    if (this._caches.length > this.options.max) {
      this.free()
    }
  }

  free() {
    this._caches.shift()
  }
}
