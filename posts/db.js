var mongoose = require('mongoose')

mongoose.connect('mongodb://localhoist/social', function()
{
	console.log('mongodb connected')
})

module.exports = mongoose