var Post = require('./posts');
var router = require('express').Router()

router.get('posts', function (req, res, next)
{
	Post.find()
	.sort('-data')
	.exec(function(err, posts)
	{
		if(err)
		{
			return next(err)
		}
		res.json(posts)
	})
})
router.post('./posts', function (req, res, next)
{
	var post = new Post(
	{
		username : req.body.username,
		body : req.body.body
	})
	post.save(function (err, post)
	{
		if(err)
		{
			return next(err)
		}
		res.json(201, post)
	})

})

module.exports = router