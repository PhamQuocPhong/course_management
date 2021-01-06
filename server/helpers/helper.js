const minuteTime = 60
const hourTime = 3600
const dayTime = 3600 * 24
const weekTime = 3600 * 24 * 7
const myTimeZone = 7


let defaultValue = (input, option) => {

	switch (option) {
		case 'number':
			if(!input || isNaN(input)){
				return 0
			}
			return input
			break;
		case 'string':
			// statements_1
			break;
		case 'array':
			// statements_1
			break;
		case 'array':
			// statements_1
		break;

		default:
			// statements_def
			break;
	}		
}

let formatCurrency = (value) => {
	if (typeof value !== "number") {
        return value;
    }
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    });
    return formatter.format(value);
}

let formatNumber = (value) =>{
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
} 

let convertDate = (value) => {
	var date = new Date(value),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  	return [day, mnth, date.getFullYear()].join("/");
}

let calcTotal = (arr, key) => {
	var totalPrice = arr.reduce((acc, obj) => {
		return acc + obj[key]
	}, 0)

	return formatCurrency(totalPrice)
} 

let calcTotalInterest = (arr, key) => {

	var totalInterestPrice = 0
	if(arr.length > 0){
		arr.forEach(transaction => { 
			var interestPrice =	transaction.transactionDetailSells.reduce((acc, obj) => {
				return acc + eval( obj.totalPrice - obj.vehicle.fixPrice - obj.vehicle.buyPrice )
			}, 0)
			totalInterestPrice += interestPrice
		})

	}
	return formatCurrency(totalInterestPrice)
}

let addCode = (code, type) => {
	// Example: B0001
	// remove first character 
	var newCode =  parseInt(code.substr(1)) + 1

	switch(type){
		case 'bike':
			var wordCode = 'B'
			return wordCode.concat(newCode.toString().padStart(4, '0'))
		case 'car':
			return 'C' + newCode.toString().padStart(4, '0')
	}
}


let subtractNotifyDateTime = (date1, date2) => {

	date2 = date2.getTime() + (myTimeZone * 3600 * 1000)
	date1 = date1.getTime() + (myTimeZone * 3600 * 1000)
	// 3600 * 24
	var dateSubtract =  Math.abs(date2 - date1)
	var subtractionDay =  Math.floor(dateSubtract / 1000 / dayTime)
	var subtractionHour = Math.floor(dateSubtract / 1000 / hourTime)
	var subtractionMinute = Math.floor(dateSubtract / 1000 / minuteTime)

	if(subtractionDay >= 1){
		return subtractionDay.toString().concat(" day")
	}

	if(subtractionHour >= 1){
		return subtractionHour.toString().concat(" hr")
	}

	if(subtractionMinute >= 1){
		return subtractionMinute.toString().concat(" min")
	}	
}



module.exports = {
	defaultValue: defaultValue,
	formatCurrency: formatCurrency,
	convertDate: convertDate,
	calcTotal: calcTotal,
	calcTotalInterest: calcTotalInterest,
	formatNumber: formatNumber,
	addCode: addCode,
	subtractNotifyDateTime: subtractNotifyDateTime
}