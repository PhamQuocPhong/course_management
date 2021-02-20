const express = require('express');
var router = express.Router();
const AwsService = require('../services/aws');

router.post('/image', async (req, res) => {
	var file = req.files.file;
	var getURL = '';

	await AwsService.upload(file, (url) => {
		getURL = AwsService.getCallbackURL(url);
		if(getURL){
			return res.status(200).json({message: "Upload success", url: getURL})
		}
	});
});

module.exports = router