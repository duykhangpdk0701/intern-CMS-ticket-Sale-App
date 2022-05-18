const CracoLessPlugin = require("craco-less");

const primaryColor = "#FFB800";

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": primaryColor,
              "@layout-sider-background": primaryColor,
              "@menu-item-active-bg": primaryColor,
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
