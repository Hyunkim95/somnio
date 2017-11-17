var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res, next) {
  res.render('scene', { title: 'Express', id: req.params.id, edit: false,ar: false});
});

router.get('/:id/ar', function(req, res, next) {
 res.render('scene', { title: 'Express', id: req.params.id, edit: false, ar: true});
});

/* GET home page. */
router.get('/:id/edit', function(req, res, next) {
  res.render('scene', { title: 'Express', id: req.params.id, edit: true, ar: false});
});

router.get('/:id/ar/edit', function(req, res, next) {
 res.render('scene', { title: 'Express', id: req.params.id, edit: true , ar: true});
});

module.exports = router;
