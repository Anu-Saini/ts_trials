import { Button, Checkbox, Form, Input } from "antd";
import React, { useState } from 'react';
import { Col, Row } from "antd";
import "./Pages.css";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN_QUERY } from "../queries/AnimalQuery";
import { useNavigate } from "react-router-dom";
import { Card } from 'antd';


function LoginPage() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    login: true,
    email: '',
    password: '',
    name: ''
  });

  const [login, { data, loading, error }]= useMutation(LOGIN_QUERY, {
    variables: {
      email: formState.email,
      password: formState.password
    }}); 
    
   if(!loading && data)
   {
    console.log(data)
    localStorage.setItem('token', data.login.token);
    localStorage.setItem('user', JSON.stringify(data.login.user));
    navigate('/user');
   }
  const checkLogin = (values) => {
     
  };
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="site-card-border-less-wrapper">
    <Card
      title="Card title"
      bordered={false}
      style={{
        width: 300,
      }}
    >
       <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
              
            }}
            onFinish={login}
            onFinishFailed={onFinishFailed}
            
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
              value={formState.email}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  email: e.target.value
                })
              }
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              value={formState.password}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  password: e.target.value
                })
              }
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            ></Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" >
                Submit
              </Button>
              <Button type="link" htmlType="button" >
                Reset Password
              </Button>
            </Form.Item>
          </Form>
    </Card>
  </div>
);
            }

export default LoginPage;
