import vue from 'rollup-plugin-vue'
import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.umd.min.js',
      format: 'umd',
      name: 'vueRokkaImageLazy',
      exports: 'named',
      globals: {
        'vue-rokka-image': 'vueRokkaImage',
        lozad: 'lozad',
      },
      sourcemap: true,
    },
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
