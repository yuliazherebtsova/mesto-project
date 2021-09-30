const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// учит «Вебпак» работать с html-файлами
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// каждый раз при сборке проекта удаляет содержимое папки dist
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// учит «Вебпак» работать с css-файлами

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
      // добавили правило для обработки файлов
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
      },
      {
        // применять это правило только к CSS-файлам
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
            // Эта опция описана в документации сss-loader (https://webpack.js.org/loaders/css-loader/#importloaders).
            // Значение 1 говорит о том, что некоторые трансформации PostCSS нужно применить до css-loader
          },
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/pages/index.html", // путь к файлу index.html
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(), // подключение плагина для объединения файлов
  ],
};
