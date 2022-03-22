const CracoLessPlugin = require("craco-less");
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
    },
  ],
  style: {
    postcss: {
      plugins: [
        require("postcss-pxtorem")({
          rootValue: 64, //设置1rem的px是37.5px
          unitPrecision: 5,
          propList: [
            "font",
            "font-size",
            "line-height",
            "width",
            "height",
            "letter-spacing",
            "margin",
            "border",
            "padding",
          ],
          selectorBlackList: [],
          replace: true,
          mediaQuery: false,
          minPixelValue: 0,
          exclude: /node_modules/i,
        }),
      ],
    },
  },
};
