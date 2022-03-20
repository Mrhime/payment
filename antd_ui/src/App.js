
import './App.css';

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker } from 'antd';
const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
  },
};
const formTailLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
    offset: 4,
  },
};

function App() {
  const [form] = Form.useForm();
  const [ExpDate] = useState(false);
  useEffect(() => {
    form.validateFields(['ExpDate']);
  }, [ExpDate]);

  const monthFormat = 'MM/YYYY';

  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      console.log('Success:', values);
       await fetch('http://localhost:3000/payment', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  return (
      <Form form={form} name="dynamic_rule">
        <Form.Item
            {...formItemLayout}
            name="CardNumber"
            label="CardNumber"
            rules={[
              {
                required: true,
                message: 'Please input CardNumber 16 numbers',
                  min: 16,
                  max: 16
              },
            ]}
        >
            <Input showCount maxLength={16}  />
        </Form.Item>
        <Form.Item

            {...formItemLayout}
            name="ExpDate"
            label="ExpDate"
            rules={[
              {
                required: true,
                message: 'Please input ExpDate',


              },
            ]}
        >

            <DatePicker  format={monthFormat} picker="month" />
        </Form.Item>

          <Form.Item
            {...formItemLayout}
            name="Cvv"
            label="Cvv"
            rules={[
              {
                required: true,
                message: 'Please input Cvv',

                  min: 3,
                  max: 3
              },
            ]}
        >
          <Input showCount maxLength={3} />
        </Form.Item>
          <Form.Item
            {...formItemLayout}
            name="Amount"
            label="Amount"
            rules={[
              {
                required: true,
                message: 'Please input Amount',
              },
            ]}
        >
          <Input placeholder="Please Amount" />
        </Form.Item>

        <Form.Item {...formTailLayout}>
          <Button type="primary" onClick={onCheck}>
            Check
          </Button>
        </Form.Item>
      </Form>
  );
};



export default App;
