import { message } from 'antd'
import { history } from 'umi'
import {
  createArticle,
  updateArticle,
  getDrafts,
  getDraftDetail,
  createDraft,
  updateDraft,
  deleteDraft,
} from '@/services/admin'

export default {
  namespace: 'write',
  state: {
    drafts: [],
    tags: [],
    markdown: '',
    title: null,
    selectedTag: null,
  },
  effects: {
    *saveDraft({ payload, callback }, { call, put }) {
      const { code, data } = yield call(createDraft, payload)
      if (code === 0) {
        history.push(`/write/draft/${data.id}`)
        message.success('保存草稿成功')
      }
    },

    *draft({ payload }, { call, put }) {
      const { code, data } = yield call(getDraftDetail, payload)
      if (code === 0) {
        yield put({
          type: 'handle',
          payload: {
            markdown: data.markdown,
            title: data.title,
          },
        })
      }
    },

    *drafts({ payload }, { call, put }) {
      const { code, data } = yield call(getDrafts, payload)
      if (code === 0) {
        yield put({
          type: 'handle',
          payload: {
            drafts: data,
          },
        })
      }
    },

    *updateDraft({ payload }, { call, put }) {
      const { code } = yield call(updateDraft, payload)
      if (code === 0) {
        message.success('保存草稿成功')
      }
    },

    *deleteDraft({ payload }, { call, put }) {
      const { code, data } = yield call(deleteDraft, payload)
      if (code === 0) {
        yield put({
          type: 'deleteDraftHandle',
          payload: data,
        })
      }
    },
  },
  reducers: {
    handle(state, { payload }) {
      return { ...state, ...payload }
    },

    deleteDraftHandle(state, { payload }) {
      return {
        ...state,
        drafts: [...state.drafts].filter(item => item.id !== payload.id),
      }
    },

    setSelecteTag(state, { payload }) {
      return { ...state, selectedTag: payload.selectedTag }
    },

    setTags(state, { payload }) {
      return {
        ...state,
        tags: payload.tags,
        selectedTag: payload.tags.length > 0 ? payload.tags[0].id : null,
      }
    },
  },
}
