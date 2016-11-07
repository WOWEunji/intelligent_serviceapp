var router = require('express').Router()

router.get('/', function (req, res)
{
	res.sendfile('./webplatform-samples/webspeechdemo/webspeechdemo.html')
})

module.exports = router