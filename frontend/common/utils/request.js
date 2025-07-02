// common/utils/request.js

const BASE_URL = 'http://127.0.0.1:8081'; // 替换为你的实际域名或IP+端口

// 创建请求函数
const request = (url, method, data = {}, showLoading = true) => {
  const token = uni.getStorageSync('token'); // 可选：从本地获取 token

  return new Promise((resolve, reject) => {
    if (showLoading) {
      uni.showLoading({
        title: '加载中',
        mask: true
      });
    }

    uni.request({
      url: BASE_URL + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      },
      success: (res) => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          resolve(res.data);
        } else if (res.statusCode === 401) {
          // Token 失效，跳转登录页
          uni.removeStorageSync('token');
          uni.reLaunch({ url: '/pages/login/login' });
        } else {
          uni.showToast({ title: '请求失败', icon: 'none' });
          reject(res.data);
        }
      },
      fail: (err) => {
        uni.showToast({ title: '网络异常', icon: 'none' });
        reject(err);
      },
      complete: () => {
        uni.hideLoading();
      }
    });
  });
};

// GET 请求封装
export const get = (url, data = {}) => {
  return request(url, 'GET', data);
};

// POST 请求封装
export const post = (url, data = {}) => {
  return request(url, 'POST', data);
};

// PUT 请求封装
export const put = (url, data = {}) => {
  return request(url, 'PUT', data);
};

// DELETE 请求封装
export const del = (url, data = {}) => {
  return request(url, 'DELETE', data);
};