const CracoLessPlugin = require("craco-less");

const primaryColor = "#FFB800";
const secondaryColor = "#ff993c";
const checkBoxColor = "#27AEF9";

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@control-border-radius": "8px",

              "@primary-color": primaryColor,
              "@layout-sider-background": primaryColor,
              "@menu-item-active-bg": primaryColor,

              //btn
              "@btn-default-border": secondaryColor,
              "@btn-padding-horizontal-base": "24px",
              "@btn-border-radius-base": "8px",
              "@btn-border-width": "1px",
              "@btn-font-weight": 700,
              "@btn-height-base": "36px",
              "@btn-height-lg": "48px",
              "@btn-font-size-lg": "18px",
              "@btn-font-size-sm": "14px",

              //radio
              "@radio-button-bg": "#fff",
              "@radio-size": "24px",
              "@radio-border-width": "2px",
              "@radio-dot-size": "16px",
              "@radio-button-color": checkBoxColor,
              "@radio-dot-color": checkBoxColor,
              "@radio-solid-color": checkBoxColor,
              "@radio-button-active-color": checkBoxColor,
              //form
              "@form-item-label-font-size": "16px",
              "@form-item-label-font-weight": 600,

              //checkbox
              "@checkbox-size": "24px",
              "@checkbox-color": checkBoxColor,
              "@checkbox-border-radius": "4px",
              "@checkbox-border-width": "2px",

              //modal
              "@modal-body-padding": "0 32px",
              "@modal-footer-padding-vertical": "24px",
              "@modal-header-padding-vertical": "24px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
