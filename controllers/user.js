const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ error: "true", message: errors.array()[0].msg });
  }

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.status(401).send({ error: "true", message: "User does not exist" });
      }
      bcrypt.compare(password, user.password)
        .then(result => {
          if (result) {
            return res.status(200).send({ error: "false", message: "User logged in successfully", data: user });
          } else if (!result) {
            return res.status(401).send({ error: "true", message: "Incorrect password" });
          }
        })
        .catch(err => {
          console.log(err);
          return res.status(500).send({ error: "true", message: "Database operation failed, please try again" });
        });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: "true", message: "Database operation failed, please try again" });
    });
};

exports.signup = async (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) return res.status(422).send({ error: true, message: 'Password mismatch' });

  const userDoc = await User.findOne({ email: req.body.email });

  if (userDoc) {
    console.log(userDoc);
    return res.status(422).send({ error: true, message: 'Email exists already, please pick a different one.' });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array()[0].msg);
    return res.status(422).send({ error: "true", message: errors.array()[0].msg });
  }

  await bcrypt
    .hash(req.body.password, 12)
    .then(hashedPassword => {
      const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: hashedPassword
      });
      return user.save();
    })
    .then(result => {
      return res.status(201).send({ error: "false", message: "User created successfully", data: result});
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: "true", message: "Error occurred, please try again" });
    });
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort('created_at');
    return res.status(200).send({ error: false, message: "Sucessfully fetched all users", data: users }); 
  } catch (error) {
    return res.status(500).send({ error: true, message: "Database operation failed" }); 
  }
}