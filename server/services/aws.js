const path = require( "path" )
require('dotenv').config({path: path.resolve('../.env')})

const aws  = require('aws-sdk')
const fs = require('fs')

const fileBucket = process.env.FILE_BUCKET || 'quanlykhoahoc/files'
const videoBucket = process.env.VIDEO_BUCKET || 'quanlykhoahoc/videos'
const courseBucket = process.env.COURSE_BUCKET || 'quanlykhoahoc/courses'
const region = process.env.REGION || 'US_EAST_2'
const accessKey = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY  

const helper = require('../helpers/helper');


aws.config.update({
  accessKeyId: accessKey,
  secretAccessKey: secretAccessKey,
  // region: region
})

let remove = async (image, type) => {

	// don't remove default avatar
	if(image === "default.png"){
		return;
	}

	var params = {}
	if(type === "avatars"){
		params.Key = image
		params.Bucket = courseBucket
	}
	var s3 = new aws.S3()
	

	s3.deleteObject(params, function (err, data) {
	
    });
}




let upload = async (file, callback) => {
	var s3 = new aws.S3()
	var params = {}

	if(!file || file === ''){
		return ''
	}

	var fileStream = fs.createReadStream(file.tempFilePath);
	var extension = path.extname(file.name);

	if(helper.isImage(file.name)){
		params.Key = `course_${new Date().getTime() + extension }`
		params.Bucket = courseBucket
		params.Body = fileStream;
		params.ACL = "public-read"
	}else if(helper.isVideo(file.name)){
		params.Key = `video_${new Date().getTime() + extension }`
		params.Bucket = videoBucket
		params.Body = fileStream;
		params.ACL = "public-read"
	}else
	{
		params.Key = `file_${new Date().getTime() + extension }`
		params.Bucket = fileBucket
		params.Body = fileStream;
		params.ACL = "public-read"
	}

	const res = await s3.putObject(params)
	.promise()
	.then(async res => {

	  	const url = await s3.getSignedUrl('getObject', {Key: params.Key, Bucket: params.Bucket});

	  	if(typeof callback === 'function'){
	  		callback(url)
	  	}
	})
	.catch(err => {
		console.log("Upload failed:", err)
	})
}



let getCallbackURL = (url) => {
	return url.split("?")[0]
}

module.exports = {
	upload,
	remove,
	getCallbackURL
}


