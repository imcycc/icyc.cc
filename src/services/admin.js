import { stringify } from 'qs'
import request from '@/utils/request'

// 获取文章列表
export async function getArticles(params) {
  return request(`/articles?${stringify(params)}`)
}

// 获取文章详情
export async function getArticleDetail(params) {
  return request(`/article?${stringify(params)}`)
}

// 添加文章
export async function createArticle(data) {
  return request('/article', {
    method: 'POST',
    data,
  })
}

// 更新文章
export async function updateArticle(data) {
  return request('/article', {
    method: 'PUT',
    data,
  })
}

// 删除文章
export async function deleteArticle(data) {
  return request('/article', {
    method: 'DELETE',
    data,
  })
}

// 获取标签列表
export async function getTags() {
  return request('/tags')
}

// 添加标签
export async function createTag(data) {
  return request('/tag', {
    method: 'POST',
    data,
  })
}

// 更新标签
export async function updateTag(data) {
  return request('/tag', {
    method: 'PUT',
    data,
  })
}

// 删除标签
export async function deleteTag(data) {
  return request('/tag', {
    method: 'DELETE',
    data,
  })
}

// 获取草稿列表
export async function getDrafts(params) {
  return request(`/drafts?${stringify(params)}`)
}

// 获取草稿详情
export async function getDraftDetail(params) {
  return request(`/draft?${stringify(params)}`)
}

// 添加草稿
export async function createDraft(data) {
  return request('/draft', {
    method: 'POST',
    data,
  })
}

// 更新草稿
export async function updateDraft(data) {
  return request('/draft', {
    method: 'PUT',
    data,
  })
}

// 删除草稿
export async function deleteDraft(data) {
  return request('/draft', {
    method: 'DELETE',
    data,
  })
}
