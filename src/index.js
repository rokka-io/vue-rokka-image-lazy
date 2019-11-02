import RokkaImgLazy from './Img.vue'
import RokkaSourceLazy from './Source.vue'
import { rokkaUrl } from 'vue-rokka-image'

export { RokkaImgLazy, RokkaSourceLazy, rokkaUrl }

export default {
  install(Vue) {
    Vue.component('rokka-img-lazy', RokkaImgLazy)
  },
}
