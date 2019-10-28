import { Config } from 'bili'

const config = {
  banner: true,
  plugins: {
    commonjs: true,
    vue: true
  },
  input: {
    index: 'src/index.js',
  },
  output: {
    dir: 'dist',
    extractCSS: false,
    format: ['esm', 'iife-min', 'cjs', 'cjs-min', 'umd-min'],
    moduleName: 'vueNestable',
  }
}

export default config