import { message } from 'antd'
import { loginAccount } from '@/services/user'
import storageHelper from '@/utils/storage'

export default {
  namespace: 'user',
  state: {},
  effects: {
    *login({ payload, callback }, { call, put }) {
      const { data, code } = yield call(loginAccount, payload)
      if (code === 0) {
        storageHelper.set('token', data)
        callback && callback()
      }
    },
  },
  reducers: {
    handle(state, { payload }) {
      return { ...state, ...payload }
    },
  },
}
