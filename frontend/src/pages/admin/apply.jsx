import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'antd';
import axios from 'axios';
import api  from '../../utils/api';


const ModelsPage = () => {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get(`${api}/api/models/`);
        setModels(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des modèles :', error);
      }
    };

    fetchModels();
  }, []);

  const columns = [
    { title: 'Nom', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Pays', dataIndex: 'country', key: 'country' },
    { title: 'Ville', dataIndex: 'city', key: 'city' },
    {
      title: 'Image de profil',
      dataIndex: 'profileImage',
      key: 'profileImage',
      render: (text, record) => (
        <img src={`${api}/${text}`} alt={record.name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div>
          <Button className='bg-black text-white' onClick={() => handleView(record)}>
            Voir
          </Button>
          <Button type="danger" onClick={() => handleDelete(record._id)} style={{ marginLeft: '8px' }}>
            Supprimer
          </Button>
        </div>
      ),
    },
  ];

  const handleView = (model) => {
    setSelectedModel(model);
    setVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/api/models/${id}`);
      setModels(models.filter((model) => model._id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression du modèle :', error);
    }
  };

  return (
    <div style={{ margin: '0 auto', maxWidth: '80%', padding: '20px' }}> <br /><br /><br /><br />
      <Table dataSource={models} columns={columns} rowKey="_id" />

      <Modal
        title="Voir le modèle"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="back" onClick={() => setVisible(false)}>
            Fermer
          </Button>,
        ]}
      >
        {selectedModel && (
          <div>
            <p><strong>Nom :</strong> {selectedModel.name}</p>
            <p><strong>Email :</strong> {selectedModel.email}</p>
            <p><strong>Pays :</strong> {selectedModel.country}</p>
            <p><strong>Ville :</strong> {selectedModel.city}</p>
            <p><strong>Téléphone :</strong> {selectedModel.phone}</p>
            <p><strong>Sexe :</strong> {selectedModel.sexe}</p>
            <p><strong>Date de naissance :</strong> {selectedModel.dob}</p>
            <p><strong>Hauteur :</strong> {selectedModel.height}</p>
            <p><strong>Instagram :</strong> {selectedModel.instagram}</p>
            <p><strong>Site web :</strong> {selectedModel.website}</p>
            <div>
              <strong>Image de profil :</strong> <br />
              <img src={`${api}/${selectedModel.profileImage}`} alt="Profil" style={{ width: 'auto', height: 'auto' }} />
            </div>
            <div>
              <strong>Image en pied entier :</strong> <br />
              <img src={`${api}/${selectedModel.fullLengthImage}`} alt="Pied entier" style={{ width: 'auto', height: 'auto' }} />
            </div>
            <div>
              <strong>Image de demi-profil :</strong> <br />
              <img src={`${api}/${selectedModel.halfProfileImage}`} alt="Demi-profil" style={{ width: 'auto', height: 'auto' }} />
            </div>
            <div>
              <strong>Image en gros plan :</strong> <br />
              <img src={`${api}/${selectedModel.closeUpImage}`} alt="Gros plan" style={{ width: 'auto', height: 'auto' }} />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ModelsPage;
