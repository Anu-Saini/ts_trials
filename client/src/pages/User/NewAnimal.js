import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  message,
  Upload,
} from "antd";
import { NEW_ANIMAL } from "../../queries/AnimalQuery";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
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

const NewAnimal = (props) => {
    const [formState, setFormState] = useState({
        animalName: '',
        othername: '',
        classification: '',
        family: '',
        age: 0,
        foods: '',
        description: '',
        threats: '',
        locations: [''],
        image: [''],
        submitBy : ''
      
      });
      const [NewAnimal, { data, loading, error }] = useMutation(NEW_ANIMAL, {
        variables: {
          animalName: formState.animalName,
          otherName: formState.animalName,
          classification: formState.classification,
          family: formState.family,
          age: formState.age,
          foods: formState.foods,
          population: formState.population,
          threats: formState.threats,
          description: formState.description,
          submitBy: formState.submitBy,
          location: formState.locations.split(" "),
          image: formState.locations.split(" "),
        },
      });
  const [componentDisabled, setComponentDisabled] = useState(true);
  const onFinish = (values) =>{
    console.log(values)
    setFormState({
      ...values,
    });
    NewAnimal();
  }
  const prop = {
    beforeUpload: (file) => {
      const isPNG = file.type === 'image/png';
      if (!isPNG) {
        message.error(`${file.name} is not a png file`);
      }
      return isPNG || Upload.LIST_IGNORE;
    },
   
  };
  return (
    <Form
    labelCol={{ span: 4 }}
    wrapperCol={{ span: 14 }}
    layout="horizontal"
      
      name="newAnimal"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="animalName"
        label="Animal Name"
        rules={[
          {
            required: true,
            message: "Please input your Animal name!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="othername" label="Other Name">
        <Input />
      </Form.Item>
      <Form.Item name='classification' label="Class">
        <Select>
          <Select.Option value="Mannals">Mannals</Select.Option>
          <Select.Option value="Reptiles">Reptiles</Select.Option>
          <Select.Option value="Birds">Birds</Select.Option>
          <Select.Option value="Amphibians">Amphibians</Select.Option>
          <Select.Option value="Insects">Insects</Select.Option>
          <Select.Option value="Fish">Fish</Select.Option>
          <Select.Option value="Other">Other</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="family"
        label="Family"
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please enter the family of the animal",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="age"
        label="Max age"
        rules={[
          {
            required: true,
            message: "Please input max Age!",
          },
        ]}
        hasFeedback
      >
        <InputNumber />
      </Form.Item>
      <Form.Item name="Food" label="Foods">
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item
        name="population"
        label="Population"
        rules={[
          {
            required: true,
            message: "Please input approx population",
          },
        ]}
        hasFeedback
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[
          {
            required: true,
            message: "Please enter short description.",
          },
        ]}
        hasFeedback
      >
             <TextArea rows={4} />
      </Form.Item>
      <Form.Item
        name="threats"
        label="Threats"
        rules={[
          {
            required: true,
            message: "Please input threats to the species",
          },
        ]}
        hasFeedback
      >
        <Input />

        </Form.Item>
        <Form.Item
          name="locations"
          label="Typically found at"
          rules={[
            {
              required: true,
              message: "Please input location to the species",
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
      

      <Form.Item label="Upload" name='image'>
        <Upload {...prop} action="/upload.do" listType="picture-card">
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>

      <Form.Item  {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default () => <NewAnimal />;
