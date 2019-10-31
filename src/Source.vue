<template>
  <rokka-source
    :org="_org"
    :hash="_hash"
    :filename="_filename"
    :stack="_stack"
    :format="_format"
    srcset-attribute="data-srcset"
    :postfix="postfix"
    :options="_options"
    :operations="operations"
    :variables="_variables"
    :data-cache="rokkaRenderUrl"
    :media="media"
    class="rokka--attr-data-src"
  />
</template>

<script>
import { RokkaSource } from 'vue-rokka-image'
import {
  computedProperties,
  createCache,
  initLozad,
  observeLozad,
} from './helper'

export default {
  name: 'RokkaSourceLazy',
  components: {
    RokkaSource,
  },
  props: {
    ...RokkaSource.props,
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
      default: () => [{}, { dpr: '2' }],
    },
    operations: {
      type: [Object, Array],
      default: () => [],
    },
    loading: {
      type: String,
      default: null,
    },
  },
  computed: {
    ...computedProperties,
  },
  created() {
    createCache()
  },
  updated() {
    observeLozad()
  },
  mounted() {
    initLozad()
  },
}
</script>

<style scoped></style>
