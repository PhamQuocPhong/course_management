const path = require( "path" )
require('dotenv').config({path: path.resolve('../.env')})

const aws  = require('aws-sdk')
const fs = require('fs')

const videoBucket = process.env.VIDEO_BUCKET || 'videoacademy68'
const avatarBucket = process.env.AVATAR_BUCKET || 'imageacademy68'
const region = process.env.REGION || 'US_EAST_2'
const accessKey = process.env.AWS_ACCESS_KEY || 'AKIAZY5ORYKVKS7RT4HT'
const secretAccessKey = process.env.AWS_SECRET_KEY  || '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'


aws.config.update({
  accessKeyId: accessKey,
  secretAccessKey: secretAccessKey,
  // region: region
})

let removeImageAws = async (image, type) => {

	// don't remove default avatar
	if(image === "default.png"){
		return;
	}

	var params = {}
	if(type === "avatars"){
		params.Key = image
		params.Bucket = avatarBucket
	}
	var s3 = new aws.S3()

	console.log(image)
	

	s3.deleteObject(params, function (err, data) {
	
    });
}

let uploadImageBase64 = async (imageBase64, type, callback) => {

	var bucket = null
	var imageRemoteName = null
	var buffImage = Buffer.from(imageBase64.replace(/^data:image\/\w+;base64,/, ""),'base64')
	var buffVideo = Buffer.from(imageBase64.replace(/^data:video\/\w+;base64,/, ""),'base64')
	var s3 = new aws.S3()
	var params = {}

	if(!imageBase64 || imageBase64 === ''){
		return ''
	}

	if(type === "avatar"){
		params.Key = `avatar_${new Date().getTime()}.jpg`
		params.Bucket = avatarBucket
		params.Body = buffImage
		params.ACL = "public-read"
	}else if(type === "video"){
		params.Key = `video_${new Date().getTime()}.mp4`
		params.Bucket = videoBucket
		params.Body = buffVideo
		params.ACL = "public-read"
	}
	

	const res = await s3.putObject(params)
	.promise()
	.then(async res => {

	  	const url = await s3.getSignedUrl('getObject', {Key: params.Key, Bucket: params.Bucket})
	  	if(typeof callback === 'function'){
	  		callback(params.Key)
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
	uploadImageBase64: uploadImageBase64,
	removeImageAws: removeImageAws,
	getCallbackURL: getCallbackURL
}


