const path = require( "path" )
require('dotenv').config({path: path.resolve('../.env')})
const VehicleTest = require('../models/vehicle_test')
const VehicleRepair= require('../models/vehicle_repair')
const TechnicalRepair= require('../models/technical_repair')
const Vehicle = require('../models/vehicle')
const Employee = require('../models/employee')
const helpers = require('../helpers/helper')
const { Op } = require("sequelize");
const puppeteer = require("puppeteer")
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

let checkConfirmReception = async (receptionCustomerSellId) => {

	var vehicleTests = await VehicleTest.findAll({
		where: {
			receptionCustomerSellId: receptionCustomerSellId
		}
	})

	return !vehicleTests.some((obj) => obj.bikeStatus == null || obj.bikeStatus === "waiting" )
} 

let findVehicleByCondition = async (name, color) => {

	return await Vehicle.findOne({
		where: {
			name: {
				[Op.iLike]: '%' + name + '%'
			},
			color: color.toLowerCase(),
		}
	})
}

let findEmployee = async (userId) => {
	return  await Employee.findOne({
		where: {
			userId: userId
		}
	})
}


let checkFixedVehicleRepair = async (vehicleRepairId) => {

	var technicalRepair = await TechnicalRepair.findAll({
		where: {
			vehicleRepairId: vehicleRepairId
		}
	})

	return !technicalRepair.some((obj) => obj.finishFlg == null || obj.finishFlg === 0)
} 


let calcFixedRepairPrice = async (vehicleRepairId) => {

	var technicalRepair = await TechnicalRepair.findAll({
		where: {
			vehicleRepairId: vehicleRepairId
		}
	})

	return technicalRepair.reduce((acc, obj) => {
		return acc + helpers.defaultValue(obj.price, 'number')
	}, 0)
}


let printTransactionPDF = async (condition, callback) => {

	var param = condition.param
	var query = condition.query
	var getURL  = BASE_URL + '/api/report/view/' + param + '/?'
	if(!query){
		return
	}

	if(query.transactionId){
		getURL += 'transactionId=' + query.transactionId
	}else{
	  getURL  +='startDate=' + query.startDate + 
		'&endDate=' + query.endDate +
		'&month=' + query.month
	}

	const browser = await puppeteer.launch({
		headless: false,
		args:['--no-sandbox', '--disable-setuid-sandbox']
    });
	const page = await browser.newPage();
	await page.goto(getURL, {waitUntil: 'networkidle0'});
	const pdf = await page.pdf({ format: 'A4',  printBackground: true, pageRanges: '1-5' });
	await browser.close();

	if(typeof callback === 'function'){
	  	callback(pdf)
	 }
}


let printTransactionDetailPDF = async (condition, callback) => {

	var param = condition.param
	var query = condition.query
	var getURL  =  BASE_URL +'/api/report/view/detail/' + param + '/?'
	if(!query){
		return
	}
	getURL += 'transactionDetailId=' + query.transactionDetailId


	const browser = await puppeteer.launch({
		headless: true,
		args:['--no-sandbox', '--disable-setuid-sandbox']
    });
	const page = await browser.newPage();
	await page.goto(getURL, {waitUntil: 'networkidle0'});
	const pdf = await page.pdf({ format: 'A4',  printBackground: true, pageRanges: '1-5' });
	
	await browser.close();

	if(typeof callback === 'function'){
	  	callback(pdf)
	 }
}

let callbackPintPDF = (data) => {
	return data
}

let getLastRecord = async (model, condition = null) => {

	if(condition){
		condition = {
			where: condition
		}
	}

	return await model.findOne({
		limit: 1,
		condition,
		order: [ 
			[ 'createdAt', 'DESC' ]
		],
		raw: true
	})
}


module.exports = {
	checkConfirmReception: checkConfirmReception,
	findVehicleByCondition: findVehicleByCondition,
	checkFixedVehicleRepair: checkFixedVehicleRepair,
	findEmployee: findEmployee,
	calcFixedRepairPrice: calcFixedRepairPrice,
	printTransactionPDF: printTransactionPDF,
	printTransactionDetailPDF: printTransactionDetailPDF,
	callbackPintPDF: callbackPintPDF,
	getLastRecord: getLastRecord
}