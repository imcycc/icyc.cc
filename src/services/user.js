import { stringify } from 'qs'
import request from '@/utils/request'

// 登录
export async function loginAccount(data) {
  return request('/auth/login', {
    method: 'POST',
    data,
  })
}
