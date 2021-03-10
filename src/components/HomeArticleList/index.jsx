import React, { useState, useEffect } from 'react'
import { Tooltip, List, Skeleton, Tag, Card } from 'antd'
import { EyeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons'
import { Link } from 'umi'
import moment from 'moment'
import { connect } from 'dva'

const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
)

const HomeArticleList = props => {
  const {
    dispatch,
    tags,
    articles,
    article_count,
    loading,
    location: { query = {} },
  } = props
  const { tag_id } = query
  const [page, setPage] = useState(1)
  useEffect(() => {
    fetchArticles()
  }, [tag_id])
  const pageChange = pageNum => {
    setPage(pageNum)
    fetchArticles()
  }

  const fetchArticles = () => {
    if (dispatch) {
      dispatch({
        type: 'article/articles',
        payload: { page, page_size: 10, tag_id },
      })
    }
  }
  return (
    <div>
      <Card bordered={false}>
        {tag_id && (
          <>
            标签：
            {
              <Tag color="orange">
                {tags.find(tag => tag._id == tag_id)?.name}
              </Tag>
            }
          </>
        )}
        <List
          loading={loading}
          itemLayout="vertical"
          dataSource={articles}
          pagination={false}
          // pagination={{
          //   pageSize: 10,
          //   total: article_count,
          //   current: page,
          //   onChange: pageChange,
          // }}
          renderItem={item => (
            <Skeleton avatar title={false} loading={false} active>
              <List.Item
                actions={[
                  <IconText
                    icon={EyeOutlined}
                    text={item.view}
                    key="list-vertical-star-o"
                  />,
                  <IconText
                    icon={LikeOutlined}
                    text={item.favorite}
                    key="list-vertical-like-o"
                  />,
                ]}
                extra={
                  item.cover ? (
                    <img width={150} height={92} alt="logo" src={item.cover} />
                  ) : null
                }
              >
                <List.Item.Meta
                  title={
                    <Link to={`/article/${item._id}`} target="_blank">
                      <h3 className="fw-700 ft-16">{item.title}</h3>
                    </Link>
                  }
                  description={
                    <span>
                      {item.tags &&
                        item.tags.map(tag => (
                          <Tag color="orange">{tag.name}</Tag>
                        ))}
                      <span>{'cyc'}</span>
                      <span className="mrl-5">·</span>
                      <span>
                        <Tooltip title={item.create_at}>
                          {moment(item.create_at).fromNow()}
                        </Tooltip>
                      </span>
                    </span>
                  }
                />
              </List.Item>
            </Skeleton>
          )}
        />
      </Card>
    </div>
  )
}

export default connect(
  ({ article: { articles, article_count, tags }, loading }) => ({
    articles,
    article_count,
    tags,
    loading: loading.effects['article/articles'],
  }),
)(HomeArticleList)
