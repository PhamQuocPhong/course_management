const express = require('express');
var router = express.Router();
const AwsService = require('../services/aws');

router.post('/image', async (req, res) => {
	var image = req.files;


	var typeUpload = ""
	var urlImage = '';
	await AwsService.uploadImage(image, typeUpload, (url) => {
		urlImage = AwsService.getCallbackURL(url)
	});

	console.log(urlImage);
});

module.exports = router