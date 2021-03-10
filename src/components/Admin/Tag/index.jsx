import React, { useEffect, useState } from 'react'
import {
  Card,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Popconfirm,
  Select,
  Divider,
} from 'antd'
import { connect } from 'dva'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import { PlusOutlined } from '@ant-design/icons'

const Tag = props => {
  const { dispatch, tags, loading } = props
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'admin/getTags' })
    }
  }, [])
  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }
  const showModal = () => {
    setVisible(true)
  }
  const onSubmit = values => {
    if (dispatch) {
      values.name = values.tagName
      new Promise(function(resolve) {
        if (values._id) {
          dispatch({
            type: 'admin/updateTag',
            payload: values,
            success: resolve,
          })
        } else {
          dispatch({
            type: 'admin/createTag',
            payload: values,
            success: resolve,
          })
        }
      }).then(() => {
        form.resetFields()
        setVisible(false)
        dispatch({ type: 'admin/getTags' })
      })
    }
  }
  const deleteTag = _id => {
    if (dispatch) {
      dispatch({
        type: 'admin/deleteTag',
        payload: { _id },
        success: () => {
          dispatch({ type: 'admin/getTags' })
        },
      })
    }
  }
  const editTag = tag => {
    const { _id, name } = tag
    form.setFieldsValue({ _id, name })
    showModal()
  }

  const columns = [
    {
      title: '序号',
      width: 50,
      dataIndex: '_id',
      render: (_, __, index) => index + 1,
    },
    {
      title: '标签名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '创建时间',
      width: 150,
      dataIndex: 'createdAt',
      render(date) {
        return <span>{moment(date).format('YYYY-MM-DD')}</span>
      },
    },
    {
      title: '更新时间',
      width: 150,
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
      render(tag) {
        return (
          <>
            <a onClick={() => editTag(tag)}>编辑</a>
            <Divider type="vertical" />
            <Popconfirm
              title="确定要删除吗？"
              cancelText="取消"
              okText="确定"
              onConfirm={() => deleteTag(tag._id)}
            >
              <a style={{ color: '#ff4d4f' }}>删除</a>
            </Popconfirm>
          </>
        )
      },
    },
  ]
  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          添加标签
        </Button>
      </Space>
      <Card size="small" bodyStyle={{ margin: 12 }}>
        <Table
          size="small"
          columns={columns}
          dataSource={tags}
          rowKey="_id"
          loading={loading}
          pagination={false}
        />
      </Card>
      <Modal
        title="添加标签"
        visible={visible}
        onCancel={handleCancel}
        destroyOnClose={true}
        width={400}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item name="_id" hidden></Form.Item>
          <Form.Item
            name="tagName"
            label="标签名称"
            rules={[
              {
                required: true,
                message: '标签名不能为空',
              },
            ]}
          >
            <Input placeholder="输入标签名" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default connect(({ admin: { tags }, loading }) => ({
  tags,
  loading: loading.effects['admin/tags'],
}))(Tag)
