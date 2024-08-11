import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Select, Upload, Button, message, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import animationData from '../assets/Animation - 1720451896449.json';
import animationData1 from '../assets/Animation - 1720451923136.json';
import LottieAnimation from './Components/LottieAnimation';
import api  from '../utils/api';



const { Option } = Select; 

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

const ModelForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const size = useWindowSize();

  const onFinish = async (values) => {
    setLoading(true);
    if (!captchaValue) {
      message.error('Veuillez cocher la case "Je ne suis pas un robot"');
      setLoading(false);
      return;
    }

    const imageFields = ['profileImage', 'fullLengthImage', 'halfProfileImage', 'closeUpImage'];
    for (let field of imageFields) {
      if (values[field]?.fileList?.length > 0) {
        for (let file of values[field].fileList) {
          if (!(file.type === 'image/jpeg' || file.type === 'image/png') || file.size / 1024 / 1024 >= 1) {
            message.error(`Le fichier ${file.name} doit être en format JPG/PNG et plus petit que 1MB`);
            setLoading(false);
            return;
          }
        }
      }
    }

    const formData = new FormData();
    Object.keys(values).forEach(key => {
      if (key === 'dob') {
        formData.append(key, values[key].format('YYYY-MM-DD'));
      } else if (key.includes('Image') && values[key]?.fileList?.length > 0) {
        values[key].fileList.forEach(file => {
          formData.append(key, file.originFileObj);
        });
      } else {
        formData.append(key, values[key]);
      }
    });

    try {
      await axios.post(`${api}/api/models/apply`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      message.success('Votre candidature a été soumise avec succès');
      form.resetFields();
    } catch (error) {
      console.error('There was an error submitting the form:', error);
      message.error('Il y a eu une erreur lors de la soumission du formulaire');
    } finally {
      setLoading(false);
    }
  };

  const heightOptions = [];
  for (let i = 165; i <= 200; i++) {
    heightOptions.push(
      <Option key={i} value={i}>
        {i} cm
      </Option>
    );
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp';
    if (!isJpgOrPng) {
      message.error('Vous ne pouvez télécharger que des fichiers JPG/PNG!');
    }
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
      message.error('L\'image doit être plus petite que 1MB!');
    }
    return isJpgOrPng && isLt1M;
  };

  return (
    <div className='flex flex-col lg:flex-row mt-16'>
      {size.width >= 1024 && (
        <div className="w-full lg:w-1/3 container justify-center mx-auto p-5 max-w-lg">
          <LottieAnimation animationData={animationData1} />
        </div>
      )}
      <div className="w-full lg:w-2/3 container justify-center mx-auto p-5 max-w-lg">
        <h1 className="text-2xl font-bold mb-5">Devenir Modèle</h1>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item name="name" label="Nom" rules={[{ required: true, message: 'Veuillez entrer votre nom' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Veuillez entrer votre email' }]}>
                <Input type="email" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="country" label="Pays" rules={[{ required: true, message: 'Veuillez entrer votre pays' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="city" label="Ville" rules={[{ required: true, message: 'Veuillez entrer votre ville' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="phone" label="Numéro de téléphone" rules={[{ required: true, message: 'Veuillez entrer votre numéro de téléphone' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="dob" label="Date de naissance" rules={[{ required: true, message: 'Veuillez entrer votre date de naissance' }]}>
                <DatePicker className="w-full" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="sexe" label="Sexe" rules={[{ required: true, message: 'Veuillez sélectionner votre sexe' }]}>
                <Select placeholder="Sélectionnez votre sexe">
                  <Option value="male">Homme</Option>
                  <Option value="female">Femme</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="height" label="Taille (cm)" rules={[{ required: true, message: 'Veuillez sélectionner votre taille' }]}>
                <Select placeholder="Sélectionnez votre taille">{heightOptions}</Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="profileImage" label="Télécharger l'image de profil" rules={[{ required: true, message: 'Veuillez télécharger votre image de profil' }]}>
                <Upload listType="picture" beforeUpload={beforeUpload}>
                  <Button icon={<UploadOutlined />}>Télécharger</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="fullLengthImage" label="Télécharger l'image en pied" rules={[{ required: true, message: 'Veuillez télécharger votre image en pied' }]}>
                <Upload listType="picture" beforeUpload={beforeUpload}>
                  <Button icon={<UploadOutlined />}>Télécharger</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="halfProfileImage" label="Télécharger l'image de profil à mi-corps" rules={[{ required: true, message: 'Veuillez télécharger votre image de profil à mi-corps' }]}>
                <Upload listType="picture" beforeUpload={beforeUpload}>
                  <Button icon={<UploadOutlined />}>Télécharger</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="closeUpImage" label="Télécharger l'image en gros plan" rules={[{ required: true, message: 'Veuillez télécharger votre image en gros plan' }]}>
                <Upload listType="picture" beforeUpload={beforeUpload}>
                  <Button icon={<UploadOutlined />}>Télécharger</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="instagram" label="Instagram">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="website" label="Site web">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <ReCAPTCHA
            sitekey="6Le7ueopAAAAACqS8CUNQ85dRmhF27Hhz-cPoI7T"
            onChange={(value) => setCaptchaValue(value)}
          />
          <Form.Item>
            <Button className="bg-black text-white rounded hover:bg-black-700" htmlType="submit" loading={loading}>
              Postuler
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="w-full lg:w-1/3 container justify-center mx-auto p-5 max-w-lg">
        <LottieAnimation animationData={animationData} />
      </div>
    </div>
  );
};

export default ModelForm;
