var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res, next) {
  res.render('scene', { title: 'Express', id: req.params.id, edit: false });
});

/* GET home page. */
router.get('/:id/edit', function(req, res, next) {
  res.render('scene', { title: 'Express', id: req.params.id, edit: true });
});

module.exports = router;
