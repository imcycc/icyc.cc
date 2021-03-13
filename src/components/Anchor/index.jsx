import React from 'react'
import { Anchor } from 'antd'

const ArticleAnchor = props => {
  const { anchors } = props
  const anchorRender = data => {
    return data.map(item => {
      if (item.descendants) {
        return (
          <Anchor.Link
            key={`${item.id}`}
            href={`#${encodeURIComponent(item.name)}`}
            title={item.name}
            className={item.level == 2 ? 'bold' : ''}
          >
            {anchorRender(item.descendants)}
          </Anchor.Link>
        )
      }
      return (
        <Anchor.Link
          key={`${item.id}`}
          href={`#${encodeURIComponent(item.name)}`}
          title={item.name}
          className={item.level == 2 ? 'bold' : ''}
        />
      )
    })
  }
  return (
    <>
      <Anchor className="mt-10 ml-0 bn" showInkInFixed>
        {anchorRender(anchors)}
      </Anchor>
    </>
  )
}

export default ArticleAnchor
