import React, { useEffect } from 'react'
import { Button, Row, Form, Input, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Link } from 'umi'
import { connect } from 'dva'

const Login = props => {
  const [form] = Form.useForm()
  const {
    dispatch,
    history,
    location: { query },
  } = props

  const onFinish = values => {
    if (dispatch) {
      dispatch({
        type: 'user/login',
        payload: values,
        callback() {
          if (query.redirect) {
            history.push(query.redirect)
          } else {
            history.push('/')
          }
        },
      })
    }
  }
  return (
    <>
      <Row
        type="flex"
        align="middle"
        justify="center"
        style={{ background: '#ddd', minHeight: '100vh' }}
      >
        <div style={{ width: 370, padding: 33, background: '#fff' }}>
          <h3 className="tc mt-10m">登录</h3>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="account"
              rules={[
                {
                  required: true,
                  message: '请输入账号',
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="输入您的账号" />
            </Form.Item>
            <Form.Item
              name="pwd"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="请输入你的密码"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox checked>自动登录</Checkbox>
              </Form.Item>
              <Link className="fr">忘记密码</Link>
            </Form.Item>
            <Form.Item>
              <Button block type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
            <Link>注册账户</Link>
          </Form>
        </div>
      </Row>
    </>
  )
}

export default connect(({ user: { account }, loading }) => ({
  account,
  loading,
}))(Login)
