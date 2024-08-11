import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Popconfirm, Form, Input, message } from 'antd';
import { Card, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { json2csv } from 'json-2-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import api  from '../../utils/api';
import { useDispatch, useSelector } from 'react-redux';



const ImageTable = () => {
    const [data, setData] = useState([]);
    const [dataCount, setDataCount] = useState(0);

    const [selectedRecord, setSelectedRecord] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [updateFormVisible, setUpdateFormVisible] = useState(false);
    const [candidateCount, setCandidateCount] = useState(null);
    const [updateFormData, setUpdateFormData] = useState({
        name: '',
        description: '',
        ville: '',
        taille: '',
        pays: '',
        age: '',
        dob: '',
        socialMedia: {},
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        if (token) {
          fetchData();
          fetchDatanbr();
        }
      }, [token, dispatch]);

    const fetchDatanbr = async () => {
        try {
            const response = await fetch(`${api}/api/models/nbr`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setCandidateCount(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`${api}/api/images`);
            setData(response.data);
            setDataCount(response.data.length);

        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    };


    const handleDelete = async (record) => {
        try {
            await axios.delete(`${api}/api/images/${record._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchData();
            message.success('Image supprimée avec succès.');
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'image:', error);
            message.error('Erreur lors de la suppression de l\'image.');
        }
    };

    const handleView = (record) => {
        setSelectedRecord(record);
        setModalVisible(true);
        message.info('Affichage de l\'image.');
    };

    const handleUpdate = (record) => {
        setSelectedRecord(record);
        setUpdateFormVisible(true);
        setUpdateFormData({
            name: record.name,
            description: record.description,
            ville: record.ville,
            taille: record.taille,
            pays: record.pays,
            age: record.age,
            dob: record.dob,
            socialMedia: record.socialMedia,
        });
        message.info('Modification de l\'image.');
    };

    const handleUpdateFormChange = (key, value) => {
        setUpdateFormData({
            ...updateFormData,
            [key]: value,
        });
    };

    const handleUpdateSubmit = async () => {
        try {
            await axios.put(`${api}/api/images/${selectedRecord._id}`, updateFormData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchData();
            setUpdateFormVisible(false);
            message.success('Image mise à jour avec succès.');
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'image:', error);
            message.error('Erreur lors de la mise à jour de l\'image.');
        }
    };

    const handleExportCSV = async () => {
        try {
            const csv = await json2csv(data);
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            saveAs(blob, 'data.csv');
            message.success('Exportation CSV réussie.');
        } catch (error) {
            console.error('Erreur lors de l\'exportation CSV:', error);
            message.error('Erreur lors de l\'exportation CSV.');
        }
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["Nom", "Ville", "Taille", "pays", "age"];
        const tableRows = [];

        data.forEach(record => {
            const recordData = [
                record.name,
                record.ville,
                record.taille,
                record.pays,
                record.age,
            ];
            tableRows.push(recordData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 20 });
        doc.text("Liste des models", 14, 15);
        doc.save('Liste des models.pdf');
        message.success('Exportation PDF réussie.');
    };

    const columns = [
        {
            title: 'Nom',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Image',
            dataIndex: 'images',
            key: 'images',
            render: (images) => (
                images && images.length > 0 ? (
                    <img src={`${api}${images[0].url}`} alt="Displayed content" style={{ width: '50px' }} />
                ) : null
            ),
        },
        {
            title: 'Ville',
            dataIndex: 'ville',
            key: 'ville',
        },
        {
            title: 'Taille',
            dataIndex: 'taille',
            key: 'taille',
        },
        {
            title: 'pays',
            dataIndex: 'pays',
            key: 'pays',
        },
        {
            title: 'age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Actions',
            key: 'actions',
            align: 'center',

            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Êtes-vous sûr de vouloir supprimer cette image?"
                        onConfirm={() => handleDelete(record)}
                        okText="Oui"
                        cancelText="Non"
                    >
                        <Button type="danger" key={`delete-${record._id}`}>Supprimer</Button>
                    </Popconfirm>
                    <Button className='bg-black text-white' key={`view-${record._id}`} onClick={() => handleView(record)}>Voir</Button>
                    <Button key={`update-${record._id}`} onClick={() => handleUpdate(record)}>Mettre à jour</Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <br /><br /><br /><br />
            <div style={{ margin: 'auto', width: '80%', }}>
                <div className="site-card-wrapper">
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card title="Total Candidates" className="cursor-pointer" onClick={() => navigate('/admin/candidats')}>
                                <div className="text-2xl font-bold">{candidateCount !== null ? `${candidateCount}` : 'Chargement...'}</div>
                                {/* <p className="text-xs text-muted-foreground">+180.1% depuis le mois dernier</p> */}
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="New Candidates" className="cursor-pointer" onClick={() => navigate('/admin/candidats')}>
                                <div className="text-2xl font-bold">573</div>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="total model " className="cursor-pointer" >
                                <div className="text-2xl font-bold">  {dataCount}</div>
                            </Card>
                        </Col>
                    </Row>
                </div><br /><br /><br />
                <div className="flex justify-between items-center mb-4">
                    <Button className="bg-black text-white" onClick={() => navigate('/ajouter')}>Ajouter model</Button>
                    <div className="space-x-2 flex">
                        <Button onClick={handleExportCSV}>Exporter en CSV</Button>
                        <Button onClick={handleExportPDF}>Exporter en PDF</Button>
                    </div>
                </div>

                <Table dataSource={data} columns={columns} rowKey="_id" />
                <Modal
                    title={selectedRecord ? selectedRecord.name : ''}
                    visible={modalVisible}
                    onCancel={() => setModalVisible(false)}
                    footer={null}
                >
                    {selectedRecord && (
                        <>
                            <p>Description: {selectedRecord.description}</p>
                            <p>Ville: {selectedRecord.ville}</p>
                            <p>Taille: {selectedRecord.taille}</p>
                            <p>pays: {selectedRecord.pays}</p>
                            <p>dob: {selectedRecord.dob}</p>
                            <p>age: {selectedRecord.age}</p>
                            <div>
                                {selectedRecord.images && selectedRecord.images.map((image) => (
                                    <img
                                        key={image._id}
                                        src={`${api}${image.url}`}
                                        alt={`Product ${image._id}`}
                                        style={{ marginRight: '10px' }}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </Modal>
                <Modal
                    title="Mettre à jour l'image"
                    visible={updateFormVisible}
                    onCancel={() => setUpdateFormVisible(false)}
                    onOk={handleUpdateSubmit}
                >
                    <Form>
                        <Form.Item label="Nom">
                            <Input
                                value={updateFormData.name}
                                onChange={(e) => handleUpdateFormChange('name', e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item label="Description">
                            <Input
                                value={updateFormData.description}
                                onChange={(e) => handleUpdateFormChange('description', e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item label="taille">
                            <Input
                                value={updateFormData.taille}
                                onChange={(e) => handleUpdateFormChange('taille', e.target.taille)}
                            />
                        </Form.Item>
                        <Form.Item label="Ville">
                            <Input
                                value={updateFormData.ville}
                                onChange={(e) => handleUpdateFormChange('ville', e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item label="age">
                            <Input
                                value={updateFormData.age}
                                onChange={(e) => handleUpdateFormChange('age', e.target.age)}
                            />
                        </Form.Item>
                        <Form.Item label="dob">
                            <Input
                                value={updateFormData.dob}
                                onChange={(e) => handleUpdateFormChange('la date de naissance', e.target.dob)}
                            />
                        </Form.Item>
                        <Form.Item label="pays">
                            <Input
                                value={updateFormData.pays}
                                onChange={(e) => handleUpdateFormChange('pays', e.target.value)}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </>
    );
};

export default ImageTable;
