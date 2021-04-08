var express = require('express');
var router = express.Router();

//Models
const Advisor = require('../models/advisor.model');

const validateNewAdvisor = require('../validation/AddAdvisor.validation');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.end('admins router');
});



/**
 * access   Public (not recommended)
 * method   POST
 * route    /admin/advisor
 */
router.post('/advisor', (req, res) => {
  const { advisorName, photoUrl } = req.body;
  const { errors, isValid } = validateNewAdvisor(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Advisor.findOne({ advisor_name: advisorName })
    .then(advisor => {
      if (advisor) {
        return res.status(400).json({ message: 'Advisor with this name already existed!' })
      }
      const newAdvisor = new Advisor({
        advisor_name: advisorName,
        advisor_photo: photoUrl
      })
      newAdvisor.save()
        .then((advisor) => res.status(200).json())
        .catch((err) => res.status(400).json());
    })
    .catch((err) => console.log(err));

})


module.exports = router;
