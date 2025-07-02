"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      src: ""
    };
  },
  onLoad() {
  },
  methods: {
    takePhoto() {
      const ctx = common_vendor.index.createCameraContext();
      ctx.takePhoto({
        quality: "high",
        success: (res) => {
          this.src = res.tempImagePath;
          common_vendor.index.navigateTo({
            url: "../editMask/editMask?src=" + this.src
          });
        }
      });
    },
    error(e) {
      common_vendor.index.__f__("log", "at pages/scan/listenCamera/listenCamera.vue:34", e.detail);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.error && $options.error(...args)),
    b: common_vendor.o((...args) => $options.takePhoto && $options.takePhoto(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/scan/listenCamera/listenCamera.js.map
