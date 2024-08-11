import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, Row, Col } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import axios from 'axios';
import api  from '../../utils/api';

const { TextArea } = Input;
const { Dragger } = Upload;

const Add = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const onFinish = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };
      const formDataForSubmit = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'images') {
          for (let i = 0; i < value.length; i++) {
            formDataForSubmit.append('images', value[i].originFileObj);
          }
        } else {
          formDataForSubmit.append(key, value);
        }
      });
      await axios.post(`${api}/api/images`, formDataForSubmit, config);
      message.success('model ajoutée avec succès');
      form.resetFields();
      setFileList([]);
    } catch (error) {
      console.error('Erreur lors de l\'ajout ', error);
      message.error('Échec de l\'ajout ');
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const props = {
    name: 'images',
    multiple: true,
    fileList,
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px' }}>
       <Row justify="center" style={{ width: '100%' }}>
        <Col xs={24} sm={18} md={12} lg={10} xl={8}><br/><br/><br/><br/>
          <h2 style={{ textAlign: 'center' }}>Ajouter model</h2>
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item label="Nom" name="name" rules={[{ required: true, message: 'Veuillez entrer le nom!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Veuillez entrer la description!' }]}>
              <TextArea />
            </Form.Item>
            <Form.Item label="Ville" name="ville" rules={[{ required: true, message: 'Veuillez entrer la ville!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="pays" name="pays" rules={[{ required: true, message: 'Veuillez entrer pays!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="la date de naissance" name="dob" rules={[{ required: true, message: 'Veuillez entrer la date de naissance!' }]}>
              <Input type='Date' />
            </Form.Item>
        
            <Form.Item label="age" name="age" rules={[{ required: true, message: 'Veuillez entrer l age !' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="taille" name="taille" rules={[{ required: true, message: 'Veuillez entrer la taille !' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Images" name="images" valuePropName="fileList" getValueFromEvent={normFile}>
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Cliquez ou faites glisser le fichier dans cette zone pour télécharger</p>
              </Dragger>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>Soumettre</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Add;









