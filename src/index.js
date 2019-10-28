import RokkaImageImgLazy from "./Img.vue";

export {
  RokkaImageImgLazy,
}

export default {
  install(Vue, options) {
    // Let's register our component globally
    // https://vuejs.org/v2/guide/components-registration.html
    Vue.component("rokka-image-img-lazy", RokkaImageImgLazy);

  }
};