"use strict";
const common_vendor = require("../vendor.js");
const BASE_URL = "http://127.0.0.1:8081";
const request = (url, method, data = {}, showLoading = true) => {
  const token = common_vendor.index.getStorageSync("token");
  return new Promise((resolve, reject) => {
    if (showLoading) {
      common_vendor.index.showLoading({
        title: "加载中",
        mask: true
      });
    }
    common_vendor.index.request({
      url: BASE_URL + url,
      method,
      data,
      header: {
        "content-type": "application/json",
        "Authorization": token ? `Bearer ${token}` : ""
      },
      success: (res) => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          resolve(res.data);
        } else if (res.statusCode === 401) {
          common_vendor.index.removeStorageSync("token");
          common_vendor.index.reLaunch({ url: "/pages/login/login" });
        } else {
          common_vendor.index.showToast({ title: "请求失败", icon: "none" });
          reject(res.data);
        }
      },
      fail: (err) => {
        common_vendor.index.showToast({ title: "网络异常", icon: "none" });
        reject(err);
      },
      complete: () => {
        common_vendor.index.hideLoading();
      }
    });
  });
};
const post = (url, data = {}) => {
  return request(url, "POST", data);
};
exports.post = post;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/common/utils/request.js.map
