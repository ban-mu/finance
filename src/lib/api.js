import apiClient from './axios';

// 公共接口
export const commonApi = {
  // 获取验证码
  getCaptcha: (params) => apiClient.get('/api/v1/common/captcha', { params }),
  // 获取系统配置
  getSystemConfig: () => apiClient.get('/api/v1/common/config'),
};

// 登录接口
export const authApi = {
  // 登录
  login: (data) => apiClient.post('/api/v1/user/logins', data),
  // 登出
  logout: () => apiClient.post('/api/v1/user/logout'),
  // 刷新token
  refreshToken: (data) => apiClient.post('/api/v1/user/refresh', data),
};

// 理财业务接口
export const financeApi = {
  // 获取基金列表
  getFundList: (params) => apiClient.get('/api/v1/finance/funds', { params }),
  // 获取基金详情
  getFundDetail: (fundId) => apiClient.get(`/api/v1/finance/funds/${fundId}`),
  // 获取持仓信息
  getHoldings: () => apiClient.get('/api/v1/finance/holdings'),
  // 购买基金
  purchaseFund: (data) => apiClient.post('/api/v1/finance/purchase', data),
  // 赎回基金
  redeemFund: (data) => apiClient.post('/api/v1/finance/redeem', data),
};
