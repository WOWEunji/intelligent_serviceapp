var router = require('express').Router()

router.get('/', function (req, res)
{
	res.sendfile('./client_page/webspeechdemo.html')
})

module.exports = router