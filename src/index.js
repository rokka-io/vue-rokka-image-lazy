import RokkaImgLazy from './Img.vue'
import RokkaSourceLazy from './Source.vue'

export { RokkaImgLazy, RokkaSourceLazy }

export default {
  install(Vue) {
    Vue.component('rokka-img-lazy', RokkaImgLazy)
  },
}
