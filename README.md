# vue-rokka-image-lazy

Loads images lazy from rokka

It's compatible to `vue-rokka-image` (currently only the `img` part)

It uses the pretty small [lozad](https://apoorv.pro/lozad.js/) library.

## Installation

```
npm install rokka-io/vue-rokka-image-lazy --save
```

## Usage

It has the same properties as `vue-rokka-image`, so just replace the import and maybe tagname to get lazyloading

It also adds srcset for 1x and 2x. You can overwrite that with the `postfix` and `options` properties.

It additionally suppports a `loading` property, which should point to a loading image
```vue
<template>
    <rokka-img-lazy-load
      alt="alt Text"
      :title="Title"
      :org="rokkaOrg"
      :stack="'resizecrop'"
      :hash="HASH"
      :format="jpg"
      filename="image.jpg"
      :loading="loadingImage"
/>
</template>
<script>
import { RokkaImageImgLazy } from 'vue-rokka-image-lazy';
export default {
  components: {
    RokkaImageImgLazy,
  },
  data() {
    return {
      loadingImage: process.env.BASE_URL + '/assets/loading.gif',
    };
  }
}
</script>
```

## Development from within a Vue.js project

* Go to component folder
* change `main` in `package.json` to
  `main: "src/index.js"`
* `npm link`
* Go to project folder
* `npm link vue-rokka-image-lazy`
* et voila  
 
