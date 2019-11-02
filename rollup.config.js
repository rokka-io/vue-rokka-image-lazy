import vue from 'rollup-plugin-vue'
import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'

const commonUMDconfig = {
  file: 'dist/single.umd.min.js',
  format: 'umd',
  name: 'vueRokkaImageLazy',
  exports: 'named',
  globals: {
    'vue-rokka-image': 'vueRokkaImage',
    lozad: 'lozad',
  },
  sourcemap: true,
}
const plugins = [
  vue(),
  resolve(),
  terser({
    include: [/^.+\.min\.js$/],
    sourcemap: true,
  }),
]
export default [
  {
    input: 'src/index.js',
    output: { ...commonUMDconfig, file: 'dist/index.umd.min.js', globals: {} },
    plugins: plugins,
  },
  {
    input: 'src/index.js',
    output: [commonUMDconfig, { file: 'dist/index.esm.js', format: 'es' }],
    plugins: plugins,
    external: ['vue-rokka-image', 'lozad'],
  },
]
