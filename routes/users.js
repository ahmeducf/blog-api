const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.json({
    message: 'this is the users route'
  });
});

module.exports = router;
