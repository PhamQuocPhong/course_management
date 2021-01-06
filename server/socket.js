/*const sendMailService = require('./services/email')
const UserNotification = require('./models/user_notification')
const User = require('./models/user')
const Employee = require('./models/employee')
const Room = require('./models/room')*/
const helper = require('./helpers/helper')
const config = require('./config')
const randomString = require('randomstring')
// const redis = require("redis");
// const client = redis.createClient({ detect_buffers: true });


var users = {}

let addUser = (socket) => {

	socket.on('ADD_USER', async (data) => {

		socket.userId = data.id
		socket.userInfo = data
		users[socket.userId] = socket

	})	
}

let roomUserJoin = (socket) => {

	socket.on('ROOM_USER_JOIN', (data) => {
		var roomId = data.roomId
		socket.join(roomId)
	})
}

let roomUserLeave = (socket) => {

	socket.on('ROOM_USER_LEAVE', (data) => {
		var roomId = data.roomId

		socket.leave(roomId, () => {

		    socket.to(roomId).emit('USER_LEAVE_ROOM', {message: "User has left the room"});
		});
	})
}

let roomSendMessenger = (socket) => {

	socket.on('ROOM_SEND_MESSENGER', (data) => {
		var roomId = data.roomId
		var message = data.message
		var userInfo = data.userInfo		

		socket.to(roomId).emit('ROOM_SEND_MESSENGER', {message: message, userInfo: userInfo})

	})
}

let userSendMessenger = (socket) => {
	socket.on('USER_SEND_MESSENGER', (data, receiver) => {
		var message = data.message
		var receiverId = receiver.id
		if(!users[receiverId])
			return
		users[receiverId].emit('USER_SEND_MESSENGER', {
			message: message,
			receiver: receiver,
			sender: socket.userInfo
		})

	})
}

let sendNotify = (socket) => {
	socket.on('SEND_NOTIFY', async (data) => {
		var userId = data.userId
		if(users[userId]){

			var newNotify = await UserNotification.create({
				name: 'Khong co gi dauuuuuuu',
				type: 'notify',
				receiverId: 2,
				senderId: 1
			})

			users[userId].emit('SEND_NOTIFY', {message: "You have just 1 new notification", data: newNotify})
		}	
	})
}

let sendMail = (socket) => {

	socket.on('SEND_MAIL', async (data) => {
		setTimeout(async () => {

			var from = 'zipzizza20@gmail.com'
			var mailTo = 'quocphong.fit@gmail.com'
			var subject = 'Confirm Requirement'
			var data ={
				username: "Phong"
			}
			sendMailService.sendMailContactCustomer(from, mailTo, subject, data, (sendMailResponse) => {
				if(sendMailResponse){
					socket.emit('SEND_MAIL', {msg: "Hello"})
				}
			})

		}, 3000)
	})
}

let removeUser = (socket) => {
	socket.on('REMOVE_USER', (data) => {
		var userId = data.userId
		// delete users[userId]

		// console.log("remove success")
	})
}

let showUsersInRoom = (socket) => {
	// socket.on('REMOVE_USER', (data) => {
	// 	var userId = data.userId
	// 	delete users[userId]

	// 	console.log("remove success")
	// })
}

module.exports = {
	sendMail: sendMail,
	addUser: addUser,
	sendNotify: sendNotify,
	removeUser: removeUser,
	roomSendMessenger: roomSendMessenger, 
	roomUserJoin: roomUserJoin,
	roomUserLeave: roomUserLeave,
	userSendMessenger: userSendMessenger,
}