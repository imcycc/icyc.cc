import { message } from 'antd'
import {
  getArticles,
  getArticleDetail,
  createArticle,
  updateArticle,
  deleteArticle,
  getTags,
  createTag,
  updateTag,
  deleteTag,

  // getDrafts,
  // getDraftDetail,
  // createDraft,
  // updateDraft,
  // deleteDraft,
} from '@/services/admin'

export default {
  namespace: 'admin',
  state: {
    articles: [],
    articleDetail: null,

    tags: [],
    // drafts: [],
  },
  effects: {
    *getArticles({ payload }, { call, put }) {
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
    *getArticleDetail({ payload }, { call, put }) {
      const { code, data } = yield call(getArticleDetail, payload)
      if (code === 0) {
        yield put({
          type: 'handle',
          payload: {
            articleDetail: data,
          },
        })
      }
    },
    *createArticle({ payload, success }, { call, put }) {
      const { code, data } = yield call(createArticle, payload)
      if (code === 0) {
        message.success('新增成功')
        success && success()
      }
    },
    *updateArticle({ payload, success }, { call, put }) {
      const { code, data } = yield call(updateArticle, payload)
      if (code === 0) {
        message.success('更新成功')
        success && success()
      }
    },
    *deleteArticle({ payload, success }, { call, put }) {
      const { code, data } = yield call(deleteArticle, payload)
      if (code === 0) {
        message.success('删除成功')
        success && success()
      }
    },

    *getTags({ payload }, { call, put }) {
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
    *deleteTag({ payload, success }, { call, put }) {
      const { code, data } = yield call(deleteTag, payload)
      if (code === 0) {
        message.success('删除成功')
        success && success()
      }
    },
    *createTag({ payload, success }, { call, put }) {
      const { code, data } = yield call(createTag, payload)
      if (code === 0) {
        message.success('新增成功')
        success && success()
      }
    },
    *updateTag({ payload, success }, { call, put }) {
      const { code, data } = yield call(updateTag, payload)
      if (code === 0) {
        message.success('更新成功')
        success && success()
      }
    },
  },
  reducers: {
    handle(state, { payload }) {
      return { ...state, ...payload }
    },
    changeArticle(state, { payload }) {
      return { ...state, articleDetail: payload.articleDetail }
    },
  },
}
