const db = require('./db')
const Employee =  require('../models/employee')
const Position =  require('../models/position')
const ReceptionCustomerSell =  require('../models/reception_customer_sell')
const ReceptionCustomerBuy =  require('../models/reception_customer_buy')
const Customer = require('../models/customer')
const Vehicle =  require('../models/vehicle')
const TechnicalTest =  require('../models/technical_test')
const Transaction =  require('../models/transaction')
const TechnicalRepair =  require('../models/technical_repair')
const VehicleTest = require('../models/vehicle_test')
const Role =  require('../models/role')
const User = require('../models/user')
const VehicleType = require('../models/vehicle_type')
const faker  = require('faker')


let bulkData = async () => {

	var role = await Role.bulkCreate(
		[
			{
				id: 1,
				name: 'super admin',
				description: 'Super Admin have all permissions'
			},
			{
				id: 2,
				name: 'admin',
				description: 'Admin have many permissions'
			},
			{
				id: 3,
				name: 'user',
				description: 'User have some permissions'
			},
			{
				id: 4,
				name: 'guest',
				description: 'Guest is a fack user'
			},
		]	
	)

	var position = await Position.bulkCreate([
		
		{
			id: 1,
			name: 'Manage',
			description: ''
		},
		{
			id: 2,
			name: 'Technical',
			description: ''
		},
		{
			id: 3,
			name: 'Reception',
			description: ''
		},
		{
			id: 4,
			name: 'Sales',
			description: ''
		},
	
	])

	if(role){
		var newUser = await User.create({
			email: 'zipzizza20@gmail.com',
			password: '$2b$10$rObYiocdOGe.euYsxrA/kOQEuzMNiXgAah9C.h5MPc38P7atygYHi',
			rememberToken: null,
			roleId: 2
		})

		await Employee.create({
				fullName: 'Phong Pham',
				emailPersonal: faker.internet.email(),
				address: faker.address.streetAddress() + ' ' + faker.address.city() + '' + faker.address.country(),
				phoneNumber: faker.phone.phoneNumber(),
				userId: newUser.id,
				positionId:  1
		})	

		var newUser2 = await User.create({
			email: 'zipzizza21@gmail.com',
			password: '$2b$10$rObYiocdOGe.euYsxrA/kOQEuzMNiXgAah9C.h5MPc38P7atygYHi',
			rememberToken: null,
			roleId: 2
		})

		await Employee.create({
				fullName: 'Linh Nguyen',
				emailPersonal: faker.internet.email(),
				address: faker.address.streetAddress() + ' ' + faker.address.city() + '' + faker.address.country(),
				phoneNumber: faker.phone.phoneNumber(),
				userId: newUser2.id,
				positionId: 3
		})	


		for(let i = 0; i < 50; i++){

			var user = await User.create({
				email: faker.internet.email(),
				password: '$2b$10$JjafK5mX1ZvuICZL6WtsoudzsI4VLlaMsP0W6we/AaesMTfL5AFyW',
				rememberToken: null,
				roleId: Math.floor(Math.random() * 3) + 2,
			})

			var employee = await Employee.create({
				fullName: faker.name.findName(),
				emailPersonal: faker.internet.email(),
				address: faker.address.streetAddress() + ' ' + faker.address.city() + '' + faker.address.country(),
				phoneNumber: faker.phone.phoneNumber(),
				userId: user.id,
				positionId:  Math.floor(Math.random() * 3) + 2
			})	

		}
	}


	await VehicleType.bulkCreate(
		[
			{
				id: 1,
				name: 'Motorbike'
			},

			{
				id: 2,
				name: 'Cycle'
			}
		]
	)

	await Vehicle.bulkCreate(
		[
			{
				name: 'Winner X',
				code: 'B0001',
				registrationPlate: '72C1 - 41243',
				color: 'red',
				price: 2000,
				quantity: 1,
				image: 'https://quanlymuabanxe.s3-ap-southeast-1.amazonaws.com/bikes/winner-x-2020-do.jpg',
				description: 'Xe winner X màu đỏ',
				vehicleTypeId: 1
			},

			{
				name: 'Winner',
				code: 'B0002',
				registrationPlate: '72C1 - 41334',
				color: 'black',
				price: 1800,
				quantity: 1,
				image: 'https://quanlymuabanxe.s3-ap-southeast-1.amazonaws.com/bikes/honda-winner-vang-dong-d3b7.png',
				description: 'Xe winner màu đen',
				vehicleTypeId: 1
			},

			{
				name: 'Exciter 135',
				code: 'B0003',
				registrationPlate: '72E1 - 41234',
				color: 'yellow',
				price: 2300,
				quantity: 1,
				image: 'https://quanlymuabanxe.s3-ap-southeast-1.amazonaws.com/bikes/exciter-rc-2014-vang-anh-kim-den.jpg',
				description: 'Xe Exciter màu vàng',
				vehicleTypeId: 1
			},



		]	
	)


}


bulkData()



