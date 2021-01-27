let mix = require("laravel-mix");
require("mix-tailwindcss");
require("laravel-mix-clean");
require("laravel-mix-nunjucks");
require('laravel-mix-copy-watched');

const outputDir = "dist/src";

// clean output first
mix.clean();

// do tasks
mix.setPublicPath(outputDir);
mix.js("src/js/**/*.js", `${outputDir}/js/main.js`);
mix.sass("src/css/main.scss", `${outputDir}/css`);
mix
  .sass("src/css/libs/tailwind.scss", `${outputDir}/css`)
  .tailwind("./tailwind/tailwind.config.js");
mix.njk("src/views/*.njk", 'dist', {
  ext: ".html",
  // data: {},
  // marked: null,
  // envOptions: null,
  // manageEnv: (nunjucks) => {},
});

mix.copyDirectory([
  'src/libs',
], `${outputDir}/libs`);
mix.copyDirectory([
  'src/images',
], `${outputDir}/images`);

mix.browserSync({
  server: {
    baseDir: "./dist",
    index: "/index.html",
  },
  files: ['./dist/*.html']
});