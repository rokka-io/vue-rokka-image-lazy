import RokkaImgLazy from './Img.vue'

module.exports = {
  RokkaImgLazy,
  default: {
    install(Vue) {
      Vue.component('rokka-img-lazy', RokkaImgLazy)
    },
  },
}
