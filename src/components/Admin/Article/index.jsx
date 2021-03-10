import React, { useEffect, useState } from 'react'
import { Card, Table, Button, Tag, Popconfirm, Space, Divider } from 'antd'
import { connect } from 'dva'
import { Link } from 'umi'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import { PlusOutlined } from '@ant-design/icons'

const Article = props => {
  const { dispatch, articles, articleCount, loading, history } = props
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchArticles()
  }, [page])

  const fetchArticles = () => {
    if (dispatch) {
      dispatch({ type: 'admin/getArticles', payload: { page, pageSize: 20 } })
    }
  }

  const deleteArticle = _id => {
    if (dispatch) {
      dispatch({
        type: 'admin/deleteArticle',
        payload: { _id },
        success: fetchArticles,
      })
    }
  }

  const newArticle = () => {
    if (dispatch) {
      dispatch({
        type: 'admin/changeArticle',
        payload: { articleDetail: null },
      })
    }
    history.push('/write/new')
  }

  const pageChange = pageNum => {
    setPage(pageNum)
  }

  const columns = [
    {
      title: '序号',
      dataIndex: '_id',
      width: 50,
      render: (_, __, index) => index + 1,
    },
    {
      title: '标题',
      ellipsis: true,
      render(article) {
        return (
          <Link className="ft-13" to={`/article/${article._id}`}>
            {article.title}
          </Link>
        )
      },
    },
    {
      title: '标签',
      dataIndex: 'tags',
      render(tags) {
        return (
          tags &&
          tags.map(tag => (
            <Tag key={tag._id} color="#87d068">
              {tag.name}
            </Tag>
          ))
        )
      },
    },
    {
      title: '发布状态',
      width: 120,
      dataIndex: 'status',
      render(date) {
        return <span>{'已发布'}</span>
      },
    },
    {
      title: '创建时间',
      width: 120,
      dataIndex: 'create_at',
      render(date) {
        return <span>{moment(date).format('YYYY-MM-DD')}</span>
      },
    },
    {
      title: '更新时间',
      width: 120,
      dataIndex: 'update_at',
      render(date, item) {
        return (
          <span>{moment(date || item.create_at).format('YYYY-MM-DD')}</span>
        )
      },
    },
    {
      title: '操作',
      width: 150,
      dataIndex: '_id',
      render(_id) {
        return (
          <>
            <Link className="ft-13" to={`/write/${_id}`}>
              编辑
            </Link>
            <Divider type="vertical" />
            <Popconfirm
              title="确定要删除吗？"
              cancelText="取消"
              okText="确定"
              onConfirm={() => deleteArticle(_id)}
            >
              <Button size="small" type="text" danger>
                删除
              </Button>
            </Popconfirm>
          </>
        )
      },
    },
  ]

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={newArticle}>
          添加文章
        </Button>
      </Space>
      <Card size="small">
        <Table
          size="small"
          columns={columns}
          dataSource={articles}
          rowKey="_id"
          loading={loading}
          pagination={false}
          // pagination={{
          //   pageSize: 10,
          //   total: articleCount,
          //   current: page,
          //   onChange: pageChange,
          // }}
        />
      </Card>
    </>
  )
}

export default connect(({ admin: { articles, articleCount }, loading }) => ({
  articles,
  articleCount,
  loading: loading.effects['admin/getArticles'],
}))(Article)
