// PostCSS — инструмент для трансформации CSS

// подключите плагины в файл
const autoprefixer = require("autoprefixer");
// Плагин autoprefixer научит PostCSS добавлять вендорные префиксы
const cssnano = require("cssnano");
// cssnano займётся минификацией css-кода

module.exports = {
  // подключите плагины к PostCSS
  plugins: [
    // подключите autoprefixer
    autoprefixer,
    // cssnano при подключении нужно передать объект опций
    // { preset: default } говорит о том, что нужно использовать
    // стандартные настройки минификации
    cssnano({ preset: "default" }),
  ],
};
