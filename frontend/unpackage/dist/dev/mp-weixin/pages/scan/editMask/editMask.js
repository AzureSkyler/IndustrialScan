"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      src: "",
      points: [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 }
      ],
      draggingIndex: null,
      canvasWidth: 0,
      canvasHeight: 0
    };
  },
  onLoad(option) {
    this.src = option.src;
  },
  onReady() {
    this.$nextTick(() => {
      common_vendor.index.createSelectorQuery().select("#mask").boundingClientRect((res) => {
        if (res) {
          this.canvasWidth = res.width;
          this.canvasHeight = res.height;
          common_vendor.index.__f__("log", "at pages/scan/editMask/editMask.vue:41", this.canvasWidth);
          common_vendor.index.__f__("log", "at pages/scan/editMask/editMask.vue:42", this.canvasHeight);
          let offsetWidth = this.canvasWidth * 0.1;
          let offsetHeight = this.canvasHeight * 0.1;
          this.points = [
            { x: 0 + offsetWidth, y: 0 + offsetHeight },
            { x: this.canvasWidth - offsetWidth, y: 0 + offsetHeight },
            { x: this.canvasWidth - offsetWidth, y: this.canvasHeight - offsetHeight },
            { x: 0 + offsetWidth, y: this.canvasHeight - offsetHeight }
          ], this.draw(common_vendor.index.createCanvasContext("mask", this));
        }
      }).exec();
    });
  },
  methods: {
    takePhoto() {
      common_vendor.index.__f__("log", "at pages/scan/editMask/editMask.vue:60", this.src);
      common_vendor.index.saveImageToPhotosAlbum({
        filePath: this.src,
        success: function() {
          common_vendor.index.__f__("log", "at pages/scan/editMask/editMask.vue:64", "save success");
        }
      });
    },
    draw(ctx) {
      if (!ctx)
        return;
      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      const points = this.points;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.closePath();
      ctx.setStrokeStyle("red");
      ctx.setLineWidth(1);
      ctx.setFillStyle("rgba(255, 0, 0, 0.0)");
      ctx.stroke();
      ctx.draw();
    },
    handleTouchStart(e) {
      const touch = e.touches[0];
      const points = this.points;
      let closestPoint = null;
      let minDist = 20;
      for (let i = 0; i < points.length; i++) {
        const dist = Math.sqrt(Math.pow(touch.x - points[i].x, 2) + Math.pow(touch.y - points[i].y, 2));
        if (dist < minDist) {
          minDist = dist;
          closestPoint = i;
        }
      }
      this.draggingIndex = closestPoint !== void 0 ? closestPoint : null;
    },
    handleTouchMove(e) {
      if (this.draggingIndex !== null) {
        const touch = e.touches[0];
        this.points[this.draggingIndex] = { x: touch.x, y: touch.y };
        const ctx = common_vendor.index.createCanvasContext("mask", this);
        this.draw(ctx);
      }
    },
    handleTouchEnd() {
      this.draggingIndex = null;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.handleTouchStart && $options.handleTouchStart(...args)),
    b: common_vendor.o((...args) => $options.handleTouchMove && $options.handleTouchMove(...args)),
    c: common_vendor.o((...args) => $options.handleTouchEnd && $options.handleTouchEnd(...args)),
    d: $data.src,
    e: $data.src,
    f: common_vendor.o((...args) => $options.takePhoto && $options.takePhoto(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/scan/editMask/editMask.js.map
