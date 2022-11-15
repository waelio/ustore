module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
  ],
  transform: {
    "\\.[tj]sx?$": ["babel-jest", {
      presets: [
        ["@babel/preset-env",
          {
            targets: {
              "node": 10
            }
          }
        ]
      ],
      plugins: [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-typescript",
        "add-module-exports"
      ]
    }]
  },
  transformFile:{
    filename: "./idbStorage.js",
    sourceRoot: "./Local.ts"
  }
};