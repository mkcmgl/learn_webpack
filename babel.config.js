module.exports = {
    presets: [
        // '@vue/cli-plugin-babel/preset',
        // 智能预设：能够编译ES6语法
        ["@babel/preset-env",
            // 按需加载core-js的polyfill
            {
                useBuiltIns: "usage",
                corejs: { version: "3", proposals: true }
            },

        ]
    ],

    // 'env': {
    //   'development': {
    //     'plugins': ['dynamic-import-node']
    //   }
    // }
}