var express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var router = express.Router();

//Model
const User = require('../models/user.model');
const Advisor = require('../models/advisor.model');
const Booking = require('../models/booking.model');

//Validation
const addNewUser = require('../validation/AddUser.validation');
const validateUserLogin = require('../validation/UserLogin.validation');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.end('users router');
});


/**
 * acces    Public
 * method   POST
 * route    /user/register
 */
router.post('/register', (req, res) => {
  const { userName, userEmail, userPassword } = req.body;
  const { errors, isValid } = addNewUser(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ user_email: userEmail })
    .then(user => {
      if (user) {
        return res.status(400).json({ message: 'User already existed!' })
      }

      const newUser = new User({
        user_name: userName,
        user_email: userEmail,
        user_password: userPassword
      })

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.user_password, salt, (err, hash) => {
          if (err) console.log(err);
          newUser.user_password = hash;
          newUser.save()
            .then(user => {
              const payload = { id: user.id, userName: user.user_name, userEmail: user.user_email }

              jwt.sign(payload, 'secret', { expiresIn: 3600 }, (err, token) => {
                res.json({
                  success: true,
                  id: user.id,
                  token: 'Bearer ' + token
                })
              })
            })
        })
      })
    })
})

/**
 * acces    Public
 * method   POST
 * route    /user/login
 */
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const { errors, isValid } = validateUserLogin(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ user_email: email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }

      bcrypt.compare(password, user.user_password)
        .then(isMatch => {
          if (isMatch) {

            const payload = { id: user.id, username: user.user_name, email: user.user_email }

            jwt.sign(payload, 'secret', { expiresIn: 3600 }, (err, token) => {
              res.json({
                success: true,
                userId: user.id,
                token: 'Bearer ' + token
              })
            })
          } else {
            errors.password = 'Password Incorrect!'
            return res.status(400).json(errors)
          }
        })
    })
})

/**
 * acces    Private
 * method   GET
 * route    /user/:userId/advisor
 * 
 * note: I can use passport auth middleware 
 *        but for simplicity 
 */
router.get('/:user_id/advisor', (req, res) => {
  const { user_id } = req.params;

  User.findOne({ _id: user_id })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'please check user id!' })
      }

      Advisor.find()
        .then(advisors => {
          res.status(200).json(advisors);
        })

    })
})


/**
 * acces    Private
 * method   POST
 * route    /user/:user_id/advisor/:advisor_id
 */
router.post('/:user_id/advisor/:advisor_id', (req, res) => {
  const { user_id, advisor_id } = req.params;
  const { date, time } = req.body;

  User.findOne({ _id: user_id })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'please check user id!' })
      }

      const booking = new Booking({ user_id, advisor_id, date, time })
      booking.save()
        .then(bookData => res.status(200).json())
        .catch(err => console.log(err));
    })

})


/**
 * acces    Private
 * method   GET
 * route    /user/:user_id/advisor/booking
 */
router.get('/:user_id/advisor/booking', (req, res) => {
  const { user_id } = req.params;

  User.findOne({ _id: user_id })
    .then(user => {
      if (!user) {
        return res.status(400).json({ message: 'check user id!' })
      }

      Booking.find()
        .then(allBookings => {
          if (!allBookings) {
            return res.status(404).json({ message: 'Bookings not found!' })
          }

          res.status(200).json(allBookings);
        })
    })
})



module.exports = router;
