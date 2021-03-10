import { extend } from 'umi-request'
import { message } from 'antd'
import storageHelper from '@/utils/storage'

const errorHandler = error => {
  const codeMaps = {
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
  }
  message.error(codeMaps[error.response.status])
}

const request = extend({
  errorHandler, // 默认错误处理
  prefix: 'http://api.icyc.cc',
  // prefix: 'http://localhost:3001',
})

// 添加请求头
request.interceptors.request.use((url, options) => {
  return {
    url,
    options: {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${storageHelper.get('token')}`,
      },
    },
  }
})

// 响应拦截器
request.interceptors.response.use(response => {
  // 克隆并处理错误信息
  response
    .clone()
    .json()
    .then(data => {
      if (data && data.code !== 0) {
        message.error(data.message)
        if (data.code === 40001) {
          window.location.href = `/login?redirect=${encodeURIComponent(
            window.location.pathname + window.location.search,
          )}`
        }
      }
    })

  return response
})

export default request
