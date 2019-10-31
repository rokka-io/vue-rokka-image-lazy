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
    format: ['iife-min', 'umd', 'umd-min'],
    moduleName: 'RokkaImageLazy',
  },
  externals: ['lozad', 'vue-rokka-image']
}

export default config