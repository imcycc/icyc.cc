import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'dva'
import {
  Input,
  Row,
  Col,
  Button,
  Popover,
  Tag,
  Dropdown,
  Menu,
  Modal,
  Table,
} from 'antd'
import {
  CaretDownOutlined,
  PictureOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'
import { history, Link } from 'umi'
import MathJax from 'react-mathjax'
import KeyboardEventHandler from 'react-keyboard-event-handler'

import UserAvatar from '@/components/UserAvatar'
import Markdown from '@/components/Markdown'
import AliOssUpload from '@/components/AliOssUpload'

import styles from './index.less'

const { CheckableTag } = Tag
const { TextArea } = Input

const Content = props => {
  const {
    tags,
    selectedTagIds,
    checkTagHandle,
    onPublish,
    returnCoverImageUrl,
  } = props
  return (
    <div>
      <h4 style={{ marginBottom: 16, marginTop: 10 }}>标签</h4>
      <div>
        {tags &&
          tags.map(tag => (
            <CheckableTag
              key={tag.name}
              checked={selectedTagIds.indexOf(tag._id) > -1}
              onChange={checked => checkTagHandle(tag._id, checked)}
            >
              {tag.name}
            </CheckableTag>
          ))}
      </div>
      <h4 style={{ marginBottom: 16, marginTop: 10 }}>文章封面图</h4>
      <div>
        <AliOssUpload type="click" returnImageUrl={returnCoverImageUrl} />
      </div>
      <div className="mt-20 tc">
        <Button type="primary" onClick={onPublish}>
          发布文章
        </Button>
      </div>
    </div>
  )
}

const ShortCutKey = () => {
  const columns = [
    {
      title: 'Markdown',
      dataIndex: 'markdown',
      key: 'markdown',
    },
    {
      title: '说明',
      dataIndex: 'explain',
      key: 'explain',
    },
    {
      title: '快捷键',
      dataIndex: 'keybord',
      key: 'keybord',
    },
  ]
  const dataSource = [
    {
      markdown: '## 标题',
      explain: 'H2',
      keybord: 'Ctrl / ⌘ + H',
    },
    {
      markdown: '**文本**',
      explain: '加粗',
      keybord: 'Ctrl / ⌘ + B',
    },
    {
      markdown: '*文本*',
      explain: '斜体',
      keybord: 'Ctrl / ⌘ + Alt + I',
    },
    {
      markdown: '[描述](链接)',
      explain: '链接',
      keybord: 'Ctrl / ⌘ + L',
    },
    {
      markdown: '![描述](链接)',
      explain: '插入图片',
      keybord: 'Ctrl / ⌘ + I',
    },
    {
      markdown: '> 引用',
      explain: '引用',
      keybord: 'Ctrl / ⌘ + Q',
    },
    {
      markdown: '```code```',
      explain: '代码块',
      keybord: 'Ctrl / ⌘ + Alt + C',
    },
    {
      markdown: '`code`',
      explain: '行代码块',
      keybord: 'Ctrl / ⌘ + Alt + K',
    },
    {
      markdown: '省略',
      explain: '表格',
      keybord: 'Ctrl / ⌘ + Alt + T',
    },
  ]
  return (
    <Table
      rowKey={d => d.markdown}
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      size="small"
    />
  )
}

const ImageModal = props => {
  const {
    imageModalVisible,
    closeImageModal,
    insertImageOk,
    returnImage,
    insertImageValue,
    insertImageValueChange,
  } = props

  return (
    <Modal
      title="插入图片"
      okText="确定"
      cancelText="取消"
      width={350}
      closable={false}
      destroyOnClose={true}
      onCancel={closeImageModal}
      visible={imageModalVisible}
      onOk={insertImageOk}
    >
      <AliOssUpload type="drag" returnImageUrl={returnImage} />
      <p className="tc mt-10">或</p>
      <Input
        placeholder="输入网络图片地址"
        size="large"
        value={insertImageValue}
        prefix={<PictureOutlined />}
        style={{ border: '1px solid #ccc' }}
        onChange={insertImageValueChange}
      />
    </Modal>
  )
}

const Write = props => {
  const {
    dispatch,
    tags,
    articleDetail,
    loading,
    match: {
      params: { key },
    },
  } = props

  const [title, setTitle] = useState(null)
  const [markdown, setMarkdown] = useState(null)
  const [selectedTagIds, setSelectedTagIds] = useState([])

  const [imageModalVisible, setImageModalVisible] = useState(false)
  const [coverImageUrl, setCoverImageUrl] = useState(null)
  const [insertImages, setInsertImages] = useState([])
  const [insertImageValue, setInsertImageValue] = useState(null)
  const inputRef = useRef()
  const textAreaRef = useRef()

  useEffect(() => {
    dispatch({ type: 'admin/getTags' })
    if (dispatch) {
      if (key !== 'new') {
        dispatch({ type: 'admin/getArticleDetail', payload: { _id: key } })
      }
    }
    if (inputRef) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (articleDetail) {
      const { title, markdown, tag_ids } = articleDetail
      setTitle(title)
      setMarkdown(markdown)
      setSelectedTagIds(tag_ids)
    }
  }, [articleDetail])

  const onChangeMarkdown = e => {
    setMarkdown(e.target.value)
  }

  const onChangeTitle = e => {
    setTitle(e.target.value)
  }

  const saveDraft = () => {
    if (dispatch) {
      if (key !== 'new' && /^\d+$/.test(key)) {
        dispatch({
          type: 'write/updateDraft',
          payload: { markdown, title, id: key },
        })
      } else {
        dispatch({
          type: 'write/saveDraft',
          payload: { markdown, title },
        })
      }
    }
  }

  const showImageModal = () => {
    setImageModalVisible(true)
  }

  const closeImageModal = () => {
    setInsertImages([])
    setImageModalVisible(false)
  }

  const checkTagHandle = (_id, checked) => {
    const nextSelectedTagIds = checked
      ? [...selectedTagIds, _id]
      : selectedTagIds.filter(t => t !== _id)
    setSelectedTagIds(nextSelectedTagIds)
  }

  const onPublish = () => {
    if (dispatch) {
      const payload = {
        title,
        markdown,
        tag_ids: selectedTagIds,
        cover_image: coverImageUrl,
      }
      console.log(payload)
      if (key !== 'new') {
        payload._id = key
        dispatch({
          type: 'admin/updateArticle',
          payload,
          success: () => {
            history.push('/admin/articles')
          },
        })
      } else {
        dispatch({
          type: 'admin/createArticle',
          payload,
          success: () => {
            history.push('/admin/articles')
          },
        })
      }
    }
  }

  const insertImageValueChange = e => {
    setInsertImageValue(e.target.value)
  }

  const insertImageOk = () => {
    let images = [...insertImages]
    if (insertImageValue) {
      images = [...images, insertImageValue]
    }

    if (images.length > 0) {
      const str = images.map(image => `![](${image})`).join('\n')
      addMarkdown(textAreaRef.current.resizableTextArea.textArea, str)
    }
    setImageModalVisible(false)
  }

  const returnImage = imageUrl => {
    setInsertImages([...insertImages, imageUrl])
  }

  const returnCoverImageUrl = imageUrl => {
    setCoverImageUrl(imageUrl)
  }

  const writeMenu = (
    <Menu className="mt-20">
      <Menu.Item key="3">
        <Link to="/">回到首页</Link>
      </Menu.Item>
    </Menu>
  )

  const addMarkdown = (el, data, start, num) => {
    const { selectionStart, selectionEnd } = el
    setMarkdown(
      [
        markdown.substring(0, selectionStart),
        data,
        markdown.substring(selectionEnd),
      ].join(''),
    )
    el.focus()
    el.setSelectionRange(selectionStart + start, selectionStart + start + num)
  }

  const addBold = el => {
    addMarkdown(el, '**加粗**', 2, 2)
  }
  const addItalic = el => {
    addMarkdown(el, '*斜体*', 1, 2)
  }
  const addImage = el => {
    addMarkdown(el, '![描述](链接)', 6, 2)
  }
  const addLink = el => {
    addMarkdown(el, '[描述](链接)', 5, 2)
  }
  const addCode = el => {
    addMarkdown(el, '\n```\n```', 4, 0)
  }
  const addLineCode = el => {
    addMarkdown(el, '``', 1, 0)
  }
  const addQuote = el => {
    addMarkdown(el, '\n> 引用', 3, 2)
  }
  const addTable = el => {
    addMarkdown(
      el,
      '\n\n| Col1 | Col2 | Col3 |\n| :----: | :----: | :----: |\n| field1 | field2 | field3 |\n',
      4,
      4,
    )
  }
  const addHeading = el => {
    let title = '## 标题'
    let start = 3
    if (markdown) {
      title = '\n## 标题'
      start = 4
    }
    addMarkdown(el, title, start, 2)
  }

  const onKeyEvent = (key, e) => {
    e.preventDefault()
    switch (key) {
      case 'ctrl+b':
        addBold(e.target)
        break
      case 'ctrl+h':
        addHeading(e.target)
        break
      case 'ctrl+l':
        addLink(e.target)
        break
      case 'ctrl+alt+t':
        addTable(e.target)
        break
      case 'ctrl+i':
        addImage(e.target)
        break
      case 'ctrl+q':
        addQuote(e.target)
        break
      case 'ctrl+alt+i':
        addItalic(e.target)
        break
      case 'ctrl+alt+c':
        addCode(e.target)
        break
      case 'ctrl+alt+k':
        addLineCode(e.target)
        break
      default:
        break
    }
  }

  return (
    <>
      <Row>
        <Col span={19}>
          <div style={{ height: 55 }}>
            <Input
              className="fw-700 h-55 ft-18 bdn tln"
              value={title}
              onChange={onChangeTitle}
              size="large"
              placeholder="请输入标题"
              ref={inputRef}
            />
          </div>
        </Col>
        <Col span={5} style={{ background: '#fff' }}>
          <Popover
            placement="bottom"
            title={<strong>快捷键</strong>}
            overlayStyle={{ width: 350 }}
            content={<ShortCutKey />}
          >
            <QuestionCircleOutlined />
          </Popover>
          <Popover
            placement="bottom"
            title={<strong>发布文章</strong>}
            content={
              <Content
                tags={tags}
                checkTagHandle={checkTagHandle}
                selectedTagIds={selectedTagIds}
                onPublish={onPublish}
                returnCoverImageUrl={returnCoverImageUrl}
              />
            }
            overlayStyle={{ width: 300 }}
            trigger="click"
          >
            <Button type="link">
              发布
              <CaretDownOutlined />
            </Button>
          </Popover>
          <Button
            loading={loading}
            type="primary"
            className="mt-10 mr-20"
            // onClick={saveDraft}
          >
            保存草稿
          </Button>
          <Dropdown overlay={writeMenu} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              <UserAvatar src={null} />
            </a>
          </Dropdown>
        </Col>
      </Row>
      <Row style={{ borderTop: '1px solid #ccc' }}>
        <Col span={12}>
          <div style={{ position: 'absolute', right: 0, top: 0, zIndex: 10 }}>
            <Button type="link" onClick={showImageModal}>
              <PictureOutlined className="ft-20" />
            </Button>
          </div>
          <div
            style={{
              // height: 'auto',
              minHeight: 'calc(100vh - 56px)',
              // minHeight: 600,
              overflowY: 'auto',
              background: '#fff',
              borderRight: '1px solid #ccc',
            }}
          >
            <KeyboardEventHandler
              handleKeys={[
                'ctrl+b',
                'ctrl+l',
                'ctrl+h',
                'ctrl+alt+t',
                'ctrl+i',
                'ctrl+alt+i',
                'ctrl+alt+c',
                'ctrl+alt+k',
                'ctrl+q',
              ]}
              onKeyEvent={onKeyEvent}
            >
              <TextArea
                style={{
                  // minHeight: 'calc(100vh - 60px)',
                  border: 'none',
                  outline: 'none',
                  padding: 20,
                  resize: 'none',
                }}
                className={styles.textareScroll}
                selectiontext="我们"
                placeholder="请输入Markdown"
                rows={3}
                onChange={onChangeMarkdown}
                value={markdown}
                ref={textAreaRef}
                spellCheck="false"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                autoSize
              />
            </KeyboardEventHandler>
          </div>
        </Col>
        <Col span={12}>
          <div style={{ height: '100%', background: '#fff', padding: 20 }}>
            <div className="markdown-body">
              <MathJax.Provider input="tex">
                <Markdown markdown={markdown} />
              </MathJax.Provider>
            </div>
          </div>
        </Col>
      </Row>
      <ImageModal
        imageModalVisible={imageModalVisible}
        closeImageModal={closeImageModal}
        insertImageOk={insertImageOk}
        returnImage={returnImage}
        insertImageValue={insertImageValue}
        insertImageValueChange={insertImageValueChange}
      />
    </>
  )
}

export default connect(({ admin: { articleDetail, tags }, loading }) => ({
  tags,
  articleDetail,
  loading: loading.effects['write/updateDraft'],
}))(Write)
