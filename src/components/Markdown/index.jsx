import React from 'react'
import ReactMarkdownWithHtml from 'react-markdown/with-html'
import CodeTag from './CodeTag'
import ImageTag from './ImageTag'
import HeadTag from './HeadTag'
import MathTag from './MathTag'
import MathInline from './MathInline'

const Markdown = props => {
  const { markdown } = props
  return (
    <ReactMarkdownWithHtml
      children={markdown}
      linkTarget={() => '_blank'}
      plugins={[require('remark-math'), require('remark-gfm')]}
      renderers={{
        code: CodeTag,
        image: ImageTag,
        heading: HeadTag,
        math: MathTag,
        inlineMath: MathInline,
      }}
      allowDangerousHtml
    />
  )
}
// |1|2|
// |-|-|
// |1|1|
export default Markdown
