import React, { useEffect } from 'react'
import { Layout } from 'antd'
import TheHeader from '@/components/TheHeader'
import TheAuthorCard from '@/components/TheAuthorCard'
import TheHotArticlesCard from '@/components/TheHotArticlesCard'
import TheTagsCard from '@/components/TheTagsCard'
import styles from './index.less'

const { Content } = Layout

const Home = props => {
  const {
    dispatch,
    children,
    location: { pathname },
  } = props

  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'article/hot' })
    }
  }, [])

  return (
    <>
      <TheHeader pathname={pathname} />
      <Content className={styles.homeContainer}>
        <div className={styles.homeContainerWrapper}>
          <div className={styles.homeContainerList}>{children}</div>
          <div className={styles.homeContainerSiderlist}>
            <TheAuthorCard />
            <div style={{ height: 20 }}></div>
            {/* <TheHotArticlesCard />
            <div style={{ height: 20 }}></div> */}
            <TheTagsCard />
            <div className="mt-10 ft-13 pl-10">
              <div className={styles.aboutColor}>豫ICP备19024432号-2</div>
            </div>
          </div>
        </div>
      </Content>
    </>
  )
}

export default Home
