import {
  getArticles,
  getHotArticles,
  getArticleDetail,
  getTags,
} from '@/services/article'

export default {
  namespace: 'article',
  state: {
    articles: [],
    hots: [],
    tags: [],
    detail: {},
  },
  effects: {
    *articles({ payload }, { call, put }) {
      const { code, data } = yield call(getArticles, payload)
      if (code === 0) {
        yield put({
          type: 'handle',
          payload: {
            articles: data,
          },
        })
      }
    },

    *hot({ payload }, { call, put }) {
      // const { code, data } = yield call(getHotArticles, payload)
      // if (code === 0) {
      //   yield put({
      //     type: 'handle',
      //     payload: {
      //       hots: data,
      //     },
      //   })
      // }
    },

    *detail({ payload }, { call, put }) {
      const { code, data } = yield call(getArticleDetail, payload)
      if (code === 0) {
        yield put({
          type: 'handle',
          payload: {
            detail: data,
          },
        })
      }
    },

    *tags({ payload }, { call, put }) {
      const { code, data } = yield call(getTags, payload)
      if (code === 0) {
        yield put({
          type: 'handle',
          payload: {
            tags: data,
          },
        })
      }
    },
  },
  reducers: {
    handle(state, { payload }) {
      return { ...state, ...payload }
    },
  },
}
