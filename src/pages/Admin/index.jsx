import React, { useEffect } from 'react'
import { Link } from 'umi'
import { connect } from 'dva'
import ProLayout from '@ant-design/pro-layout'
import { FileTextOutlined, TagsOutlined } from '@ant-design/icons'

const routes = {
  routes: [
    {
      exact: true,
      name: '文章管理',
      icon: <FileTextOutlined />,
      path: '/admin/articles',
    },
    {
      exact: true,
      name: '标签管理',
      icon: <TagsOutlined />,
      path: '/admin/tags',
    },
  ],
}

const Admin = props => {
  const { children, account, history } = props
  useEffect(() => {
    // if (!account || !account.id) {
    //   history.push('/login')
    // }
    // if (account.account_type !== 'ADMIN') {
    //   history.push('/404')
    // }
  }, [])
  return (
    <div>
      <ProLayout
        title="后台管理中心"
        logo={null}
        siderWidth={200}
        contentWidth="Fluid"
        navTheme="light"
        fixSiderbar={true}
        fixedHeader={true}
        route={routes}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (
            menuItemProps.isUrl ||
            menuItemProps.children ||
            !menuItemProps.path
          ) {
            return defaultDom
          }

          return <Link to={menuItemProps.path}>{defaultDom}</Link>
        }}
      >
        {children}
      </ProLayout>
    </div>
  )
}

export default connect(({ user: { account }, loading }) => ({
  account,
  loading,
}))(Admin)
