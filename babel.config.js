const babelConfig = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "current"
        }
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ],
    // "@babel/plugin-proposal-optional-chaining",
    "transform-class-properties"
  ]
}

module.exports = babelConfig