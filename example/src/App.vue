<template>
  <div id="app">
    <div v-for="image in images" :key="image.short_hash">
      <rokka-img-lazy
        :hash="image.short_hash"
        :org="image.organization"
        stack="dynamic/resize-width-200-height-200"
        :options="{ af: 1 }"
        :filename="image.name"
      ></rokka-img-lazy>
    </div>
  </div>
</template>

<script>
import rokka from 'rokka'
import { RokkaImgLazy } from 'vue-rokka-image-lazy'
const rokkaKey = '1V5HdgIYdFnVu8qU7HfXYiHjVdRtYWFB' //read only key
const rokkaOrg = 'gallery-demo'
const rokkaClient = rokka({
  apiKey: rokkaKey,
})
export default {
  name: 'App',
  components: {
    RokkaImgLazy,
  },
  data() {
    return { images: [] }
  },
  created() {
    rokkaClient.sourceimages.list(rokkaOrg).then(result => {
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
