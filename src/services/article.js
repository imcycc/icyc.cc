import { stringify } from 'qs'
import request from '@/utils/request'

// 获取文章列表
export async function getArticles(params) {
  return request(`/public/articles?${stringify(params)}`)
}

// 获取文章详情
export async function getArticleDetail(params) {
  return request(`/public/article?${stringify(params)}`)
}

// 获取标签列表
export async function getTags() {
  return request('/public/tags')
}

// 获取热门文章列表
export async function getHotArticles() {
  return request('/public/hot')
}
