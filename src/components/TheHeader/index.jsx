import React, { useState, useEffect } from 'react'
import { Layout, Menu, Drawer, Button, Dropdown } from 'antd'
import { connect } from 'dva'
import Icon, { MenuOutlined } from '@ant-design/icons'
import { Link } from 'umi'
import UserAvatar from '@/components/UserAvatar'
import storageHelper from '@/utils/storage'

import styles from './index.less'

const { Header } = Layout
const { SubMenu } = Menu

const tabs = [
  {
    title: '首页',
    key: 'home',
    icon: 'home',
    path: '/home',
  },
  // {
  //   title: '文章',
  //   key: 'articles',
  //   key2: 'all',
  //   icon: 'file-done',
  //   path: '/home/articles/all'
  // },
  // {
  //   title: '教程',
  //   key: 'course',
  //   key2: 'all',
  //   icon: 'project',
  //   path: '/home/course/all'
  // }
]

const TheHeader = props => {
  const { pathname } = props

  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }

  const handleClick = () => {}
  return (
    <Header>
      <div className={styles.homeHeader}>
        <div className={styles.homeHeaderLeft}>
          <div className={styles.homeHeaderPc}>
            <Link to="/" className={styles.brand} style={{ height: 64 }}>
              <img
                src={'/favicon.png'}
                style={{ height: '100%', float: 'left' }}
              />
            </Link>
            <Menu
              mode="horizontal"
              style={{ height: '64px', borderBottom: 'none' }}
              selectedKeys={[pathname]}
            >
              {tabs &&
                tabs.map(item => (
                  <Menu.Item key={item.path}>
                    <Link
                      to={{
                        pathname: item.path,
                        state: { category: item.key, tag: item.key2 },
                      }}
                    >
                      {item.title}
                    </Link>
                  </Menu.Item>
                ))}
            </Menu>
          </div>
          <div className={styles.homeHeaderMobile}>
            <Button type="link" onClick={showDrawer}>
              <MenuOutlined />
            </Button>
            <span>cyc</span>
          </div>
        </div>
      </div>
      <Drawer
        title={
          <>
            <Link to="/" className="brand mr-10">
              <img
                src={'/favicon.png'}
                style={{ height: '24px', float: 'left' }}
              />
            </Link>
            <span>导航栏</span>
          </>
        }
        placement="left"
        closable
        onClose={onClose}
        visible={visible}
        bodyStyle={{ padding: 0 }}
      >
        <Menu onClick={handleClick} selectedKeys={[pathname]} mode="inline">
          {tabs &&
            tabs.map(item => (
              <Menu.Item key={item.path}>
                <Link
                  to={{
                    pathname: item.path,
                    state: { category: item.key, tag: item.key2 },
                  }}
                >
                  <Icon type={item.icon} />
                  {item.title}
                </Link>
              </Menu.Item>
            ))}
        </Menu>
      </Drawer>
    </Header>
  )
}

export default TheHeader
