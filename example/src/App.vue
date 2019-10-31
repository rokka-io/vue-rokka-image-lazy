<template>
  <div id="app">
    <div v-for="image in images" :key="image.short_hash">
      <!-- missing :loading="loading img" -->
      <rokka-img-lazy
        v-if="mode === 'img'"
        :hash="image.short_hash"
        :org="image.organization"
        stack="dynamic"
        :operations="[
          {
            name: 'resize',
            options: { width: 200, height: 200, upscale: false },
          },
        ]"
        :options="[{ af: 1 }, { dpr: 2, af: 1 }]"
        :filename="image.name"
      ></rokka-img-lazy>
      <rokka-picture
        v-if="mode === 'picture'"
        :hash="image.short_hash"
        :org="image.organization"
        stack="dynamic"
        :operations="[
          {
            name: 'resize',
            options: { width: 200, height: 200, upscale: false },
          },
        ]"
        :filename="image.name"
        :postfix="['1x', '2x']"
        :options="[{ af: 1 }, { af: 1, dpr: 2 }]"
      >
        <!-- make them grayscale when device width < 1000px -->
        <rokka-source-lazy
          media="(max-width: 1000px)"
          :operations="[
            {
              name: 'resize',
              options: { width: 200, height: 200, upscale: false },
            },
            { name: 'grayscale' },
          ]"
        />
        <rokka-source-lazy media="all"></rokka-source-lazy>
        <rokka-img-lazy></rokka-img-lazy>
      </rokka-picture>
    </div>
  </div>
</template>

<script>
import rokka from 'rokka'
import { RokkaImgLazy, RokkaSourceLazy } from 'vue-rokka-image-lazy'
import { RokkaPicture } from 'vue-rokka-image'

const rokkaKey = '1V5HdgIYdFnVu8qU7HfXYiHjVdRtYWFB' //read only key

const rokkaOrg = 'gallery-demo'
const rokkaClient = rokka({
  apiKey: rokkaKey,
})
export default {
  name: 'App',
  components: {
    RokkaImgLazy,
    RokkaSourceLazy,
    RokkaPicture
  },
  data() {
    return { images: [], mode: 'picture' }
  },
  created() {
    rokkaClient.sourceimages.list(rokkaOrg, { limit: 50 }).then(result => {
      this.images = result.body.items
    })
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-gap: 6px;
  min-height: 200px;
}

#app div {
  height: 200px;
}
</style>
