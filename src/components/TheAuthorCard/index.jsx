import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Divider, Tooltip } from 'antd'
import {
  WeiboCircleOutlined,
  GlobalOutlined,
  GithubOutlined,
} from '@ant-design/icons'
import UserAvatar from '@/components/UserAvatar'

const TheAuthorCard = () => {
  const detail = {
    user: {
      avatar: 'default',
      nickname: 'icyc',
      profession: 'web前端工程师',
      total_view: '99w',
      total_like: '99w',
      total_comment: '99w',
      website: 'http://icyc.cc',
      github: 'https://github.com/imcycc',
    },
  }
  return (
    <Card title="关于作者" bordered={false} size="small">
      <div style={{ display: 'flex', marginBottom: 20 }}>
        {detail && detail.user && detail.user.avatar && (
          <UserAvatar size="large" src={detail.user.avatar} />
        )}
        <div className="pl-1m">
          <h5>{detail.user && detail.user.nickname}</h5>
          <small>{detail.user && detail.user.profession}</small>
        </div>
      </div>
      <Row className="tc" type="flex" align="middle" justify="space-between">
        <Col span={8}>
          <h2 className="m-0">
            <b>{detail.user && detail.user.total_view}</b>
          </h2>
          <small>浏览</small>
        </Col>
        <Col span={8}>
          <h2 className="m-0">
            <b>{detail.user && detail.user.total_like}</b>
          </h2>
          <small>点赞</small>
        </Col>
        <Col span={8}>
          <h2 className="m-0">
            <b>{detail.user && detail.user.total_comment}</b>
          </h2>
          <small>评论</small>
        </Col>
      </Row>
      <Divider dashed className="mb-0" />
      <div className="ft-16 ml-10 mt-10">
        {detail.user && detail.user.website && (
          <Tooltip title={detail.user.website}>
            <a href={detail.user.website} className="mr-10">
              <GlobalOutlined />
            </a>
          </Tooltip>
        )}
        {detail.user && detail.user.github && (
          <Tooltip title={detail.user.github}>
            <a href={detail.user.github} className="mr-10">
              <GithubOutlined />
            </a>
          </Tooltip>
        )}
        {detail.user && detail.user.weibo && (
          <Tooltip title={detail.user.weibo}>
            <a href={detail.user.weibo} className="mr-10">
              <WeiboCircleOutlined />
            </a>
          </Tooltip>
        )}
        {detail.user && detail.user.gitee && (
          <Tooltip title={detail.user.gitee}>
            <a href={detail.user.gitee}>
              <IconFont type="icon-gitee" />
            </a>
          </Tooltip>
        )}
      </div>
    </Card>
  )
}

export default TheAuthorCard
