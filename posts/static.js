var router = require('express').Router()

router.get('/', function (req, res)
{
	res.sendfile('./webspeechdemo.html')
})

module.exports = router