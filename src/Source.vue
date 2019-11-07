<template>
  <rokka-source
    :organization="_organization"
    :hash="_hash"
    :filename="_filename"
    :stack="_stack"
    :format="_format"
    srcset-attribute="data-srcset"
    :postfix="_postfix"
    :options="_options"
    :operations="operations"
    :variables="_variables"
    :data-cache="rokkaRenderUrl"
    :media="media"
    :sourceimage="_sourceimage"
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
