const path = require("path");

module.exports = {
  entry: { main: "./src/pages/index.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "",
  },
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "./dist"), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт

    open: {
      app: {
        name: "Google Chrome",
      },
    }, // сайт будет открываться сам при запуске npm run dev
  },
  module: {
    /* Наше правило звучит так: «если тебе попадётся файл с расширением .js, сначала отдай этот файл модулю babel-loader,
    а затем добавляй в сборку. Но не применяй это правило к пакетам, скачанным из NPM,
     которые лежат в папке node_modules». */
    rules: [
      // rules — это массив правил
      // добавим в него объект правил для бабеля
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        use: "babel-loader",
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: "/node_modules/",
      },
    ],
  },
};
