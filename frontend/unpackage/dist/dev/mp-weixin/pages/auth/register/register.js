"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_utils_request = require("../../../common/utils/request.js");
const _sfc_main = {
  data() {
    return {
      registerForm: {
        email: "",
        password: ""
      }
    };
  },
  onLoad() {
  },
  methods: {
    async register() {
      try {
        const res = await common_utils_request.post("/api/auth/register", this.registerForm);
        common_vendor.index.showToast({ title: "注册成功" });
        common_vendor.index.__f__("log", "at pages/auth/register/register.vue:26", "响应数据:", res);
        common_vendor.index.navigateTo({ url: "/pages/auth/index/1" });
      } catch (err) {
        common_vendor.index.__f__("error", "at pages/auth/register/register.vue:31", "注册失败:", err);
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: _ctx.email,
    b: common_vendor.o(($event) => _ctx.email = $event.detail.value),
    c: _ctx.password,
    d: common_vendor.o(($event) => _ctx.password = $event.detail.value),
    e: common_vendor.o((...args) => $options.register && $options.register(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/auth/register/register.js.map
