module.exports = {

	BASE_URL: 'http://localhost',
	DATABASE_URL: process.env.DATABASE_URL,
	SECRETKEY: process.env.SECRETKEY,


	ACCESS_TOKEN_LIFE    :  process.env.ACCESS_TOKEN_LIFE,
	ACCESS_TOKEN_SECRET  :  process.env.ACCESS_TOKEN_SECRET,
	REFRESH_TOKEN_LIFE   :  process.env.REFRESH_TOKEN_LIFE,
	REFRESH_TOKEN_SECRET :  process.env.REFRESH_TOKEN_SECRET,

	BIKE_BUCKET :  process.env.BIKE_BUCKET,
	AVATAR_BUCKET :  process.env.AVATAR_BUCKET,
	REGION :  process.env.REGION,
	AWS_ACCESS_KEY :  process.env.AWS_ACCESS_KEY,
	AWS_SECRET_KEY :  process.env.AWS_SECRET_KEY,

	PUBLIC_VAPID_KEY: process.env.PUBLIC_VAPID_KEY,
	PRIVATE_VAPID_KEY: process.env.PRIVATE_VAPID_KEY,

	userRole: {
		SUPER_ADMIN: 1,
		ADMIN: 2,
		EMPLOYEE: 3,
		GUEST: 4
	},

	employeePosition: {
		MANAGE: 1,
		TECHNICAL: 2,
		RECEPTION: 3,
		SALES: 4,
	},

	vehicle: {
		VALID: 1,
		UNVALID: 0,
		QUANTITY_DEFAULT: 1, 
	},

	vehicleType: {
		CAR: 2,
		MOTOR_BIKE: 1
	},

	sales: {
		CONTACTED_FLG: 1,
	},

	notify: {
		EMAIL: 'email',
		NOTICE: 'notify',
		MESSENGER: 'messenger',
	},

	statusVehicleTest: {
		NORMAL: "normal",
		OLD: "old",
		NEW: "new",
		DEFAULT: "waiting",
	},


}