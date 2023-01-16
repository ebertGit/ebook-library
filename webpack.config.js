const { VueLoaderPlugin } = require('vue-loader')
const { VuetifyLoaderPlugin } = require('vuetify-loader')

module.exports = {
  mode: 'development',
  entry: {
    main: "./vue/main.js"
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/public/js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // 它会应用到普通的 `.js` 文件
      // 以及 `.vue` 文件中的 `<script>` 块
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ["@babel/preset-env"]
        }
      },
      // 它会应用到普通的 `.css` 文件
      // 以及 `.vue` 文件中的 `<style>` 块
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          // {
          //   loader: 'style-loader',
          //   options: {
          //     esModule: false
          //   }
          // },
          'css-loader'
        ]
      },
      {
        test: /\.s[ca]ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // Requires >= sass-loader@^8.0.0
            options: {
              implementation: require('sass'),
              sassOptions: {
                indentedSyntax: true // optional
              },
            },
          },
        ],
      }
    ]
  },
  plugins: [
    
    new VueLoaderPlugin(), // 使用vue时，请确保引入这个插件来施展魔法
    new VuetifyLoaderPlugin({
        /**
         * 将为每个vue组件中使用的每个标记调用此函数
         * 它应该返回一个数组，第一个元素将被插入到组件数组中，第二个元素应该是相应的导入
         *
         * originalTag - 最初在模板中使用的标记
         * kebabTag    - 标签序列化为kebab-case
         * camelTag    - 标签序列化为PascalCase
         * path        - 指向到当前 .vue 文件的相对路径
         * component   - 表示解析后的当前组件
         */
        match (originalTag, { kebabTag, camelTag, path, component }) {
          if (kebabTag.startsWith('core-')) {
            return [
              camelTag,
              `import ${camelTag} from '@/components/core/${camelTag.substring(4)}.vue'`
            ]
          }
        }
      })
  ],
  resolve: {
    extensions: ['.js', '.ts', '.vue'],
    alias: {
      vue$: "vue/dist/vue.esm.js"
    }
  }
}