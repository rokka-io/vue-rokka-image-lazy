import vue from 'rollup-plugin-vue'
import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'

const defaultOutput = {
  file: 'dist/index.umd.min.js',
  format: 'umd',
  name: 'vueRokkaImageLazy',
  exports: 'named',
  globals: {
    'vue-rokka-image': 'vueRokkaImage',
    lozad: 'lozad',
  },
  sourcemap: true,
}

export default {
  input: 'src/index.js',
  output: [
    defaultOutput,
    { ...defaultOutput, file: 'dist/index.min.js' },
    { file: 'dist/index.esm.js', format: 'es' },
  ],
  plugins: [
    vue(),
    resolve(),
    terser({
      include: [/^.+\.min\.js$/],
      sourcemap: true,
    }),
  ],
  external: ['vue-rokka-image', 'lozad'],
}
