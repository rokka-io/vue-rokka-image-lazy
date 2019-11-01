import vue from 'rollup-plugin-vue'
import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.iife.min.js',
      format: 'iife',
      name: 'vueRokkaImageLazy',
      exports: 'named',
      globals: {
        'vue-rokka-image': 'vueRokkaImage',
        lozad: 'lozad',
      },
      sourcemap: true,
    },
    { file: 'dist/index.esm.js', format: 'es' },
    { file: 'dist/index.esm.min.js', format: 'es', sourcemap: true },
  ],
  plugins: [
    vue(),
    terser({
      include: [/^.+\.min\.js$/],
      sourcemap: true,
    }),
    resolve(),
  ],
  external: ['vue-rokka-image', 'lozad'],
}
