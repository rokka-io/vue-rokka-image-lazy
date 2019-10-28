<template>
  <rokka-image-img
    :org="org"
    :hash="hash"
    :filename="filename"
    :stack="stack"
    :format="format"
    :alt="alt"
    :key="hash"
    srcset-attribute="data-srcset"
    src-attribute="data-src"
    src-additional-attribute="src"
    :src-additional="srcAdditionalComputed"
    :postfix="postfix"
    :options="options"
  />
</template>

<script>
import { RokkaImageImg, buildRokkaUrl } from 'vue-rokka-image';
import lozad from 'lozad';

class ImageCache {
  constructor({ max }) {
    this.options = {
      max: max || 100,
    };
    this._caches = [];
  }

  has(key) {
    return this._caches.indexOf(key) > -1;
  }

  add(key) {
    if (this.has(key)) return;
    this._caches.push(key);
    if (this._caches.length > this.options.max) {
      this.free();
    }
  }

  free() {
    this._caches.shift();
  }
}

export default {
  name: 'RokkaImageImgLazy',
  components: {
    RokkaImageImg
  },
  props: {
    ...RokkaImageImg.props,
    srcAttribute: {
      type: String,
      default: 'data-src',
    },
    srcsetAttribute: {
      type: String,
      default: 'data-srcset',
    },
    postfix: {
      type: [Object, Array],
      default: () => ['1x', '2x'],
    },
    options: {
      type: [Object, Array],
      default: () => [{ dpr: '1' }, { dpr: '2' }],
    },
    loading: {
      type: String,
      default: null,
    },
  },
  created() {
    if (!window._imageCache) {
      window._imageCache = new ImageCache({ max: 200 });
    }
  },
  computed: {
    srcAdditionalComputed() {
      if (!this.loading || this.isCached) {
        return "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
      }
      window._imageCache.add(this.rokkaRenderUrl);
      return this.loading;
    },

    isCached() {
      return window._imageCache.has(this.rokkaRenderUrl)
    },

    rokkaRenderUrl() {
      return buildRokkaUrl({
        org: this.org,
        hash: this.hash,
        stack: this.stack,
        format: this.format,
        filename: this.filename,
        options: Array.isArray(this.options) ? this.options[0] : this.options,
        variables: Array.isArray(this.variables) ?this.variables[0]: this.variables,
      });

    }
  },
  mounted() {
    // We initialize Lozad.js on the root
    // element of our component.
    if (!window._lozadObserver) {
      window._lozadObserver = lozad('.rokka--attr-data-src', {
        rootMargin: '200px',
      });
    }
    window._lozadObserver.observe();
  },
};
</script>

<style scoped></style>
