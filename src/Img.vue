<template>
  <rokka-img
    :org="_org"
    :hash="_hash"
    :filename="_filename"
    :sourceimage="_sourceimage"
    :stack="_stack"
    :format="_format"
    :alt="_alt"
    :title="_title"
    srcset-attribute="data-srcset"
    src-attribute="data-src"
    src-additional-attribute="src"
    :src-additional="srcAdditionalComputed"
    :postfix="_postfix"
    :options="_options"
    :operations="operations"
    :variables="_variables"
    :data-cache="rokkaRenderUrl"
  />
</template>

<script>
import { RokkaImg } from 'vue-rokka-image'
import {
  computedProperties,
  createCache,
  observeLozad,
  initLozad,
} from './helper'

export default {
  name: 'RokkaImgLazy',
  components: {
    RokkaImg,
  },
  props: {
    ...RokkaImg.props,
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
    rootMargin: {
      type: String,
      default: '200px',
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
    initLozad(this.rootMargin)
  },
}
</script>

<style scoped></style>
