import React, { useEffect } from 'react'
import { Tag, Card } from 'antd'
import { Link } from 'umi'
import { connect } from 'dva'

const TheTagsCard = props => {
  const { dispatch, tags, loading } = props
  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'article/tags' })
    }
  }, [])

  return (
    <Card loading={loading} size="small" bordered={false} title="常用标签">
      {tags &&
        tags.map(tag => (
          <Tag key={tag._id} className="mb-10">
            <Link to={`/home?tag_id=${tag._id}`}>{tag.name}</Link>
          </Tag>
        ))}
    </Card>
  )
}

export default connect(({ article: { tags }, loading }) => ({
  tags,
  loading: loading.effects['article/tags'],
}))(TheTagsCard)
