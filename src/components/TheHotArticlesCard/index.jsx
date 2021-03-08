import React, { useEffect } from 'react'
import { Card } from 'antd'
import { connect } from 'dva'
import SiderList from '@/components/SiderList'

const TheHotArticlesCard = props => {
  const { dispatch, hots, loading } = props

  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'article/hot' })
    }
  }, [])

  return (
    <Card size="small" loading={loading} bordered={false} title="热门文章">
      <SiderList
        dataSource={hots}
        bordered={false}
        size="small"
        split={false}
      />
    </Card>
  )
}

export default connect(({ article: { hots }, loading }) => ({
  hots,
  loading: loading.effects['article/hot'],
}))(TheHotArticlesCard)
