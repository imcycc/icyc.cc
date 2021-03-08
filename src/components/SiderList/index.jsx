import React from 'react'
import { List } from 'antd'
import { Link } from 'umi'
import { EyeOutlined, LikeOutlined } from '@ant-design/icons'

const SiderList = props => {
  const { dataSource, size, split } = props
  return (
    <List
      itemLayout="vertical"
      dataSource={dataSource}
      size={size}
      split={split}
      renderItem={item => (
        <List.Item
          className="pl-0"
          actions={[
            <span key="1">
              <EyeOutlined />
              <span className="pl-2 pointer">{item.view}</span>
            </span>,
            <span key="2">
              <LikeOutlined />
              <span className="pl-2 pointer">{item.favorite}</span>
            </span>,
          ]}
        >
          <Link
            to={`/article/${item.id}`}
            style={{ color: '#000000a6' }}
            target="_block"
          >
            {item.title}
          </Link>
        </List.Item>
      )}
    />
  )
}

export default SiderList
