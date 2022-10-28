import { Button, Checkbox, Form, Input } from 'antd';
import React , {useState} from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { NEW_USER } from '../queries/AnimalQuery';
import { useNavigate } from 'react-router-dom';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const container = {
  padding: "20vh"
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegisterUser = (props) => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    
    email: '',
    password: '',
    userName: ''
  });

  const [NewUser, { data, loading, error }]= useMutation(NEW_USER, {

    variables: {
      userName: formState.username,
      email: formState.email,
      password: formState.password
    }}); 

    if(error)
    console.log(error)
if(!loading && data)
{
  console.log(data);
  navigate('/login');
}

  const [form] = Form.useForm();
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const onFinish = (values) => {
    debugger
    setFormState({
      ...values
    });
    const data ={
      userName: formState.username,
      email: formState.email,
      password: formState.password
    };
    console.log(data)
    NewUser();
  };
  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div style={container}>
    <Form
    {...formItemLayout}
    form={form}
    name="register"
    onFinish={onFinish}
    scrollToFirstError
  >
<Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="username"
        label="Name"
        rules={[{ required: true, message: 'Please input your Name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary"  htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};
export default RegisterUser;