const express = require('express');
const multer = require('multer');
const Image = require('../models/Image');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); 
  }
});
const upload = multer({ storage: storage });

router.post('/', [auth, admin], upload.array('images', 5), async (req, res) => {
  try {
    const uploadedImages = req.files.map(file => ({
      url: '/uploads/' + file.filename 
    }));

    const { name, description, ville, pays, age, dob,  taille, socialMedia } = req.body;

    const newImage = new Image({
      name,
      description,
      ville,
      dob,
      pays,
      age,
      images: uploadedImages,
      taille,
      socialMedia: {
        facebook: socialMedia?.facebook,
        twitter: socialMedia?.twitter,
        instagram: socialMedia?.instagram,
        linkedin: socialMedia?.linkedin,
      }
    });

    const savedImage = await newImage.save();
    res.json(savedImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/:id', [auth, admin], async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    const { name, description, ville, pays, dob,  age, taille, socialMedia } = req.body;

    image.name = name || image.name;
    image.description = description || image.description;
    image.ville = ville || image.ville;
    image.pays = pays || image.pays;
    image.dob = dob || image.dob;
    image.age = age || image.age;
    image.taille = taille || image.taille;
    image.socialMedia = {
      facebook: socialMedia?.facebook || image.socialMedia.facebook,
      twitter: socialMedia?.twitter || image.socialMedia.twitter,
      instagram: socialMedia?.instagram || image.socialMedia.instagram,
      linkedin: socialMedia?.linkedin || image.socialMedia.linkedin,
    };

    const updatedImage = await image.save();
    res.json(updatedImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get('/', async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.json(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

router.get('/ville/:ville', async (req, res) => {
  try {
    const ville = req.params.ville;
    const images = await Image.find({ ville });
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({error });
  }
});
router.put('/:id', [auth, admin], upload.array('images', 3), async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    const uploadedImages = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        uploadedImages.push({
          url: '/uploads/' + file.filename 
        });
      }
    }

    const { name, description, ville, pays, dob,  age, taille, socialMedia } = req.body;
    image.name = name || image.name;
    image.description = description || image.description;
    image.ville = ville || image.ville;
    image.pays = pays || image.pays;
    image.dob = dob || image.dob;
    image.age = age || image.age;
    if (uploadedImages.length > 0) {
      image.images = uploadedImages;
    }
    image.taille = taille || image.taille;
    image.socialMedia = {
      facebook: socialMedia?.facebook || image.socialMedia.facebook,
      twitter: socialMedia?.twitter || image.socialMedia.twitter,
      instagram: socialMedia?.instagram || image.socialMedia.instagram,
      linkedin: socialMedia?.linkedin || image.socialMedia.linkedin,
    };

    const updatedImage = await image.save();
    res.json(updatedImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    const image = await Image.findOneAndDelete({ _id: req.params.id });
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({error });
  }
});

module.exports = router;
