const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');
require('dotenv').config();
const crypto = require('crypto');
const nodemailer = require('nodemailer');


router.post(
    '/register',
    [
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { name, email, password } = req.body;
  
      try {
        let user = await User.findOne({ email });
        if (user) {
          return res.status(400).json({ msg: 'User already exists' });
        }
  
        user = new User({
          name,
          email,
          password,
        });
  
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
  
        await user.save();
  
        const payload = {
          user: {
            id: user.id,
          },
        };
  
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: '60 days' },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }
  );


router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }

            const payload = {
                user: {
                    id: user.id,
                    role: user.role,
                },
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '5 days' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);


router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User with this email does not exist' });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = resetPasswordExpire;

        await user.save();

        const resetUrl = `http://localhost:3000/resetPassword/${resetToken}`;

        // Send email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_USER,
            subject: 'Password Reset Request',
            text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process within ten minutes of receiving it:\n\n
            ${resetUrl}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Email could not be sent');
            }
            res.status(200).json({ msg: 'Email sent' });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


router.put('/reset-password/:resetToken', async (req, res) => {
    const { resetToken } = req.params;
    const { password } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: resetToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid or expired token' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({ msg: 'Password reset successful' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


module.exports = router;
