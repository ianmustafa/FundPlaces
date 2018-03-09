let mix = require('laravel-mix')

mix.options({
  processCssUrls: false
})
mix.browserSync({ proxy: 'http://fundplaces.v', port: 8100 })
mix.less('less/style.less', 'public/css/style.css')
mix.combine([
  'node_modules/jquery/dist/jquery.js',
  'node_modules/bootstrap/js/transition.js',
  'node_modules/bootstrap/js/collapse.js',
], 'public/js/vendor.js')
