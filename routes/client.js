var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./client/index')
});



router.get('/search', function(req, res, next) {
  res.render('./client/fundraiserSearch')
});


router.get('/fundraiser/:id', function(req, res, next) {
  const fundraiserId = req.params.id; 

  res.render('./client/fundraiser_detail', { id: fundraiserId });
});




router.get('/foot',function(req,res,next){
	res.render('./client/footer')
})

router.get('/head',function(req,res,next){
	res.render('./client/header')
})
//

module.exports = router;
