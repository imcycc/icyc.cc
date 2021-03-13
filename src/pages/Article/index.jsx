import React, { useEffect, useState } from 'react'
import { Layout, Card, List, Row, Col, Divider, Tooltip } from 'antd'
import moment from 'moment'
import { connect } from 'dva'
import MathJax from 'react-mathjax'
import TheHeader from '@/components/TheHeader'
import TheAuthorCard from '@/components/TheAuthorCard'
import TheHotArticlesCard from '@/components/TheHotArticlesCard'
import UserAvatar from '@/components/UserAvatar'
import ArticleAnchor from '@/components/Anchor'
import Markdown from '@/components/Markdown'

import styles from './index.less'
import './markdown.css'

const { Content } = Layout

const Article = props => {
  const {
    dispatch,
    loading,
    detail,
    match: {
      params: { id },
    },
  } = props

  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'article/detail', payload: { _id: id } })
    }
  }, [])
  return (
    <>
      <TheHeader />
      <Content className={styles.articleContainer}>
        <div className={styles.articleContainerWrapper}>
          <div className={styles.articleContainerDetail}>
            <Card
              size="small"
              bordered={false}
              loading={loading}
              className="p-1m"
            >
              <div className="pt-3">
                <div
                  className="mb-1m"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ display: 'flex' }}>
                    <UserAvatar size="large" src={''} />
                    <div className="pl-1m">
                      <h4 className="mb-0 fw-700">cyc</h4>
                      <small>
                        {moment(detail.create_at).format(
                          'YYYY[年]MM[月]DD[日]',
                        )}
                      </small>
                    </div>
                  </div>
                </div>
                {detail && detail.cover && (
                  <div>
                    <img style={{ width: '100%' }} src={detail.cover} />
                  </div>
                )}

                <h1 className="mt-15m fw-700 mb-15m">{detail.title}</h1>
                <div className="markdown-body ft-16">
                  <MathJax.Provider>
                    <Markdown markdown={detail.markdown} />
                  </MathJax.Provider>
                </div>
              </div>
            </Card>
          </div>
          <div className={styles.articleContainerSider}>
            <TheAuthorCard />
            {detail && detail.contents && (
              <ArticleAnchor anchors={detail.contents} />
            )}
          </div>
        </div>
      </Content>
    </>
  )
}

export default connect(({ article: { detail }, loading }) => ({
  detail,
  loading: loading.effects['article/detail'],
}))(Article)
