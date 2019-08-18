let extendPlugins = [];
if (process.env.NODE_ENV == 'production') {
  extendPlugins.push("transform-remove-console")
}
module.exports = {
  presets: [
    ['@vue/app', {
      polyfills: [
        'es6.promise',
        'es6.symbol',
        'es6.array.iterator',
        'es7.promise.finally'
      ]
    }]
  ],
  "plugins": [
    [
      "import",
      {
        "libraryName": "iview",
        "libraryDirectory": "src/components"
      }
    ],
    ...extendPlugins
  ]
}