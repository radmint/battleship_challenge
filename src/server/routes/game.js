let express = require('express');
let router = express.Router();
let ships = require('../data/ships');

/* GET users listing. */
router.get('/ships', function(req, res, next) {

  console.log(ships);
  res.status(200);
});

module.exports = router;
