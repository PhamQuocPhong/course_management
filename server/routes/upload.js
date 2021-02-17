const express = require('express');
var router = express.Router();
const awsService = require('../services/aws');

router.post('/image', async (req, res) => {
	var image = req.files;

	console.log(image);
	return false;

	var typeUpload = ""
	var urlImage = '';
	await AwsService.uploadImageBase64(image, typeUpload, (url) => {
		urlImage = AwsService.getCallbackURL(url)
	});

	console.log(urlImage);
});

module.exports = router