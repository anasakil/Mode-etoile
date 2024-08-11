const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const Model = require('../models/Model');
require('dotenv').config();

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.originalname}`;
    cb(null, fileName);
  }
});

const upload = multer({ storage: storage });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

router.post('/apply', upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'fullLengthImage', maxCount: 1 },
  { name: 'halfProfileImage', maxCount: 1 },
  { name: 'closeUpImage', maxCount: 1 }
]), async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const modelData = {
      ...req.body,
      profileImage: req.files.profileImage[0].path,
      fullLengthImage: req.files.fullLengthImage[0].path,
      halfProfileImage: req.files.halfProfileImage[0].path,
      closeUpImage: req.files.closeUpImage[0].path
    };

    const newModel = new Model(modelData);
    await newModel.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: 'Nouvelle candidature de modèle',
      text: `Nouvelle candidature de modèle reçue de ${req.body.name}.
             Nom: ${req.body.name}
             Email: ${req.body.email}
             Date de naissance: ${req.body.dob}
             Numéro de téléphone: ${req.body.phone}
             Sexe: ${req.body.sexe}
             Taille: ${req.body.height}
             Instagram: ${req.body.instagram}
             Site web: ${req.body.website}
             Pays: ${req.body.country}
             Ville: ${req.body.city}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #000;">Nouvelle candidature de modèle reçue de <strong>${req.body.name}</strong></h2>
          <p><strong>Nom:</strong> ${req.body.name}</p>
          <p><strong>Email:</strong> ${req.body.email}</p>
          <p><strong>Date de naissance:</strong> ${req.body.dob}</p>
          <p><strong>Numéro de téléphone:</strong> ${req.body.phone}</p>
          <p><strong>Sexe:</strong> ${req.body.sexe}</p>
          <p><strong>Taille:</strong> ${req.body.height} cm</p>
          <p><strong>Instagram:</strong> ${req.body.instagram}</p>
          <p><strong>Site web:</strong> ${req.body.website}</p>
          <p><strong>Pays:</strong> ${req.body.country}</p>
          <p><strong>Ville:</strong> ${req.body.city}</p>
          <hr style="border: 1px solid #ccc;">
          <p><strong>Image de profil:</strong></p>
          <img src="cid:profileImage" alt="${req.files.profileImage[0].originalname}" style="width: 200px; height: auto; display: block; margin-bottom: 20px;">
          <p><strong>Image en pied:</strong></p>
          <img src="cid:fullLengthImage" alt="${req.files.fullLengthImage[0].originalname}" style="width: 200px; height: auto; display: block; margin-bottom: 20px;">
          <p><strong>Image de profil à mi-corps:</strong></p>
          <img src="cid:halfProfileImage" alt="${req.files.halfProfileImage[0].originalname}" style="width: 200px; height: auto; display: block; margin-bottom: 20px;">
          <p><strong>Image en gros plan:</strong></p>
          <img src="cid:closeUpImage" alt="${req.files.closeUpImage[0].originalname}" style="width: 200px; height: auto; display: block; margin-bottom: 20px;">
        </div>`,
      attachments: [
        {
          filename: req.files.profileImage[0].originalname,
          path: req.files.profileImage[0].path,
          cid: 'profileImage' 
        },
        {
          filename: req.files.fullLengthImage[0].originalname,
          path: req.files.fullLengthImage[0].path,
          cid: 'fullLengthImage' 
        },
        {
          filename: req.files.halfProfileImage[0].originalname,
          path: req.files.halfProfileImage[0].path,
          cid: 'halfProfileImage' 
        },
        {
          filename: req.files.closeUpImage[0].originalname,
          path: req.files.closeUpImage[0].path,
          cid: 'closeUpImage' 
        }
      ]
    };
    

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).send('Error submitting the application.');
      }
      res.status(200).send('Application submitted successfully');
    });
  } catch (err) {
    console.error('Error processing application:', err);
    res.status(500).send('Error submitting the application.');
  }
});

router.get('/', async (req, res) => {
  try {
    const models = await Model.find();
    res.status(200).json(models);
  } catch (err) {
    console.error('Error retrieving models:', err);
    res.status(500).send('Error retrieving models.');
  }
});
router.get('/nbr', async (req, res) => {
  try {
    const modelsnbr = (await Model.find()).length;
    res.status(200).json(modelsnbr);
  } catch (err) {
    console.error('Error retrieving models:', err);
    res.status(500).send('Error retrieving models.');
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const modelId = req.params.id;
    const deletedModel = await Model.findByIdAndDelete(modelId);

    if (!deletedModel) {
      return res.status(404).send('Model not found');
    }

    res.status(200).send('Model deleted successfully');
  } catch (err) {
    console.error('Error deleting model:', err);
    res.status(500).send('Error deleting model.');
  }
});

module.exports = router;
