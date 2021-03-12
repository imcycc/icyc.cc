import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { github } from 'react-syntax-highlighter/dist/esm/styles/prism'

const CodeTag = props => {
  const { value, language } = props
  return (
    <SyntaxHighlighter style={github} language={language} children={value} />
  )
}

export default CodeTag
