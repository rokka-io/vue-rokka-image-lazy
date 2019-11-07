<template>
  <rokka-img
    organization="gallery-demo"
    hash="7ac62a"
    :operations="[{ name: 'resize', options: { width: 300 } }]"
    :options="[{ autoformat: 1 }, { autoformat: 1, dpr: 2 }]"
    :postfix="['1x', '2x']"
    loading="https://rokka.io/gallery/assets/loader.svg"
  >
  </rokka-img>
</template>

<script>
import RokkaImg from '../src/Img'
export default {
  name: 'ImgRender',
  components: {
    RokkaImg,
  },
  data() {
    return {
      resize: { name: 'resize', options: { width: 100, height: 1000 } },
    }
  },
}
</script>

<style scoped></style>
