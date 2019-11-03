<template>
  <div id="app">
    <div>
      <gallery
        :images="galleryImages"
        :options="{
          fullScreen: fullscreen,
          startSlideshow: slideshow,
          slideshowInterval: 3000,
        }"
        :index="galleryIndex"
        @close="galleryIndex = null"
      ></gallery>

      <h1>rokka-vue-image-lazy example</h1>
      <div id="form">
        <div>
          <input
            type="radio"
            @change="changeelement"
            name="element"
            value="img"
            :checked="element === 'img'"
          />With img element<br />
          <input
            type="radio"
            @change="changeelement"
            name="element"
            value="picture"
            :checked="element === 'picture'"
          />With picture element<br />
        </div>
        <div>
          <input
            type="radio"
            @change="changelazy"
            name="lazy"
            value="true"
            :checked="lazy === 'true'"
          />With lazy loading<br />
          <input
            type="radio"
            @change="changelazy"
            name="lazy"
            value="false"
            :checked="lazy === 'false'"
          />Without lazy loading<br />
        </div>
      </div>
      <div>
        Images are a little bit rotated in each mode to see the difference.<br />
        If you make the window smaller than 1000px, the images are grayscale in
        'picture' element mode.
      </div>
    </div>
    <div id="images">
      <div
        v-for="(image, index) in images"
        :key="image.short_hash"
        @click="galleryIndex = index"
      >
        <rokka-img-lazy
          v-if="element === 'img' && lazy === 'true'"
          :sourceimage="image"
          :options="[{ autoformat: 1 }, { autoformat: 1, dpr: 2 }]"
          loading="loader.svg"
          :operations="[
            {
              name: 'resize',
              options: { width: 200, height: 200, upscale: false },
            },
          ]"
        ></rokka-img-lazy>
        <rokka-picture
          v-if="element === 'picture' && lazy === 'true'"
          :sourceimage="image"
          stack="dynamic"
          :postfix="['1x', '2x']"
          :options="[{ autoformat: 1 }, { autoformat: 1, dpr: 2 }]"
          :operations="[
            {
              name: 'resize',
              options: { width: 200, height: 200, upscale: false },
            },
            {
              name: 'rotate',
              options: { angle: 1 },
            },
          ]"
        >
          <!-- make them grayscale when device width < 1000px -->

          <rokka-source-lazy
            media="(max-width: 1000px)"
            :operations="[{ name: 'grayscale' }]"
          />
          <rokka-source-lazy media="all"></rokka-source-lazy>
          <rokka-img-lazy loading="loader.svg"></rokka-img-lazy>
        </rokka-picture>

        <!-- img not lazy loaded. postfix and options make it at srcset for retina screens. -->
        <rokka-img
          v-if="element === 'img' && lazy === 'false'"
          :sourceimage="image"
          :postfix="['1x', '2x']"
          :options="[{ autoformat: 1 }, { dpr: 2, autoformat: 1 }]"
          :operations="[
            {
              name: 'resize',
              options: { width: 200, height: 200, upscale: false },
            },
            {
              name: 'rotate',
              options: { angle: 358 },
            },
          ]"
        ></rokka-img>
        <rokka-picture
          v-if="element === 'picture' && lazy === 'false'"
          :sourceimage="image"
          :postfix="['1x', '2x']"
          :options="[{ autoformat: 1 }, { autoformat: 1, dpr: 2 }]"
          :operations="[
            {
              name: 'resize',
              options: { width: 200, height: 200, upscale: false },
            },
            {
              name: 'rotate',
              options: { angle: 357 },
            },
          ]"
        >
          <!-- make them grayscale when device width < 1000px -->

          <rokka-source
            media="(max-width: 1000px)"
            :operations="[{ name: 'grayscale' }]"
          />
          <rokka-source media="all"></rokka-source>
          <rokka-img></rokka-img>
        </rokka-picture>
        <div
          class="credits"
          v-if="image.user_metadata && image.user_metadata.unsplash_artist_id"
        >
          Photo by
          <a
            :href="
              `https://unsplash.com/@${image.user_metadata.unsplash_artist_id}`
            "
            >{{ image.static_metadata.exif.artist }}</a
          ><br />
          on
          <a
            :href="
              `https://unsplash.com/photos/${
                image.user_metadata.unsplash_photo_id
              }`
            "
            >Unsplash</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import rokka from 'rokka'
import { RokkaImgLazy, RokkaSourceLazy } from 'vue-rokka-image-lazy'
import { RokkaPicture, RokkaSource, RokkaImg, rokkaUrl } from 'vue-rokka-image'
import VueGallery from 'vue-gallery'
const rokkaKey = 'qjbm2piHyONJelrpSeWuIhRROS6Gls00' //read only key

const rokkaOrg = 'gallery-demo'
const rokkaClient = rokka({
  apiKey: rokkaKey,
})
export default {
  name: 'App',
  components: {
    RokkaImgLazy,
    RokkaSourceLazy,
    RokkaPicture,
    RokkaSource,
    RokkaImg,
    gallery: VueGallery,
  },
  data() {
    const uri = window.location.hash.substring(1)
    const params = new URLSearchParams(uri)
    return {
      images: [],
      element: params.get('element') || 'img',
      lazy: params.get('lazy') || 'true',
      galleryIndex: null,
      slideshow: false,
      fullscreen: false,
    }
  },
  methods: {
    changelazy(e) {
      this.lazy = e.target.value
      this.changehistory()
    },

    changeelement(e) {
      this.element = e.target.value
      this.changehistory()
    },

    changehistory() {
      window.history.pushState(
        null,
        null,
        '#element=' + this.element + '&' + 'lazy=' + this.lazy
      )
    },
  },
  computed: {
    galleryImages() {
      return this.images.map(image => {
        const url = rokkaUrl({
          sourceimage: image,
          operations: [
            { name: 'resize', options: { width: 1500, height: 1000 } },
          ],
          options: { autoformat: 1 },
        })
        return {
          href: url,
          title:
            (image.static_metadata &&
              image.static_metadata.exif &&
              image.static_metadata.exif.title) ||
            image.filename,
        }
      })
    },
  },
  created() {
    rokkaClient.sourceimages.list(rokkaOrg, { limit: 100 }).then(result => {
      this.images = result.body.items
    })
  },
}
</script>

<style>
body {
  background-color: #f7f7f5;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0 20px;
  color: #2c3e50;
}

a:link,
a:visited {
  color: black;
}

#form {
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-gap: 6px;
}

#images {
  text-align: center;
  display: grid;
  grid-template-columns: repeat(auto-fill, 220px);
  grid-gap: 6px;
  min-height: 200px;
  margin-top: 30px;
}

#images > div {
  height: 250px;
  grid-template-rows: 1fr auto;
  display: grid;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: white;
  padding: 5px 0;
}
#images > div > img {
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
}
</style>
