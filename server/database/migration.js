const Sequelize = require('sequelize')
const db = require('./db')

const Category =  require('../models/category')
const Course = require('../models/course')
const CourseDocument = require('../models/course_document')
const CourseTeacher = require('../models/course_teacher')
const CourseStudent = require('../models/course_student')
const CourseChapter = require('../models/course_chapter')
const Promotion = require('../models/promotion')
const Rate = require('../models/rate')
const Role = require('../models/role')
const User = require('../models/user')
const WatchList = require('../models/watch_list')
const ActiveMail = require('../models/active_mail');
const RateTotal = require('../models/rate_total');
const StateDocument = require('../models/course_document');


Category.hasMany(Course, {onDelete: 'cascade', hooks:true})
Course.belongsTo(Category, {onDelete: 'cascade', hooks:true})

Role.hasOne(User, {onDelete: 'cascade', hooks:true})
User.belongsTo(Role, {onDelete: 'cascade', hooks:true})

User.hasMany(CourseTeacher, {onDelete: 'cascade', hooks:true})
CourseTeacher.belongsTo(User, {onDelete: 'cascade', hooks:true})
Course.hasMany(CourseTeacher, {onDelete: 'cascade', hooks:true})
CourseTeacher.belongsTo(Course, {onDelete: 'cascade', hooks:true})

User.hasMany(CourseStudent, {onDelete: 'cascade', hooks:true})
CourseStudent.belongsTo(User, {onDelete: 'cascade', hooks:true})
Course.hasMany(CourseStudent, {onDelete: 'cascade', hooks:true})
CourseStudent.belongsTo(Course, {onDelete: 'cascade', hooks:true})

User.hasMany(Rate, {onDelete: 'cascade', hooks:true})
Rate.belongsTo(User, {onDelete: 'cascade', hooks:true})

Course.hasOne(RateTotal, {onDelete: 'cascade', hooks:true})
RateTotal.belongsTo(Course, {onDelete: 'cascade', hooks:true})

Course.hasMany(CourseChapter, {onDelete: 'cascade', hooks:true})
CourseChapter.belongsTo(Course, {onDelete: 'cascade', hooks:true})

CourseChapter.hasMany(CourseDocument, {onDelete: 'cascade', hooks:true})
CourseDocument.belongsTo(CourseChapter, {onDelete: 'cascade', hooks:true})

Course.hasMany(Promotion, {onDelete: 'cascade', hooks:true})
Promotion.belongsTo(Course, {onDelete: 'cascade', hooks:true})

Course.hasMany(Rate, {onDelete: 'cascade', hooks:true})
User.hasMany(Rate, {onDelete: 'cascade', hooks:true})
Rate.belongsTo(Course, {onDelete: 'cascade', hooks:true})
Rate.belongsTo(User, {onDelete: 'cascade', hooks:true})


Course.hasMany(WatchList, {onDelete: 'cascade', hooks:true})
User.hasMany(WatchList, {onDelete: 'cascade', hooks:true})
WatchList.belongsTo(Course, {onDelete: 'cascade', hooks:true})
WatchList.belongsTo(User, {onDelete: 'cascade', hooks:true})


Category.hasMany(Category, {foreignKey: 'parentId', as: 'subCategory'})


User.hasMany(ActiveMail, {onDelete: 'cascade', hooks:true})
ActiveMail.belongsTo(User, {onDelete: 'cascade', hooks:true})


/*Course.hasMany(StateDocument, {onDelete: 'cascade', hooks:true})
User.hasMany(StateDocument, {onDelete: 'cascade', hooks:true})
StateDocument.belongsTo(Course, {onDelete: 'cascade', hooks:true})
StateDocument.belongsTo(User, {onDelete: 'cascade', hooks:true})*/

//Category.belongsTo(Category, {foreignKey: 'parentId', onDelete: 'cascade', hooks:true})


/*


VehicleType.hasMany(Vehicle, {onDelete: 'cascade', hooks:true})
Vehicle.belongsTo(VehicleType, {onDelete: 'cascade', hooks:true})


// employee model
User.hasOne(Employee, {onDelete: 'cascade', hooks:true})
Employee.belongsTo(User, {onDelete: 'cascade', hooks:true})


// employee position model
Position.hasMany(Employee, {onDelete: 'cascade', hooks:true})
Employee.belongsTo(Position, {onDelete: 'cascade', hooks:true})



// reception_customer_buy 
ReceptionCustomerBuy.belongsTo(Employee, {onDelete: 'cascade', hooks:true})
Employee.hasMany(ReceptionCustomerBuy, {onDelete: 'cascade', hooks:true})
SalesCustomerBuy.hasMany(VehicleSuggest, {onDelete: 'cascade', hooks:true})

ReceptionCustomerBuy.hasOne(SalesCustomerBuy, {onDelete: 'cascade', hooks:true})
Sales.hasOne(SalesCustomerBuy, {onDelete: 'cascade', hooks:true})
Sales.belongsTo(Employee, {onDelete: 'cascade', hooks:true})

SalesCustomerBuy.belongsTo(Sales, {onDelete: 'cascade', hooks:true})
SalesCustomerBuy.belongsTo(ReceptionCustomerBuy, {onDelete: 'cascade', hooks:true})
SalesCustomerBuy.belongsTo(Customer, {onDelete: 'cascade', hooks:true})


VehicleSuggest.belongsTo(SalesCustomerBuy, {onDelete: 'cascade', hooks:true})
VehicleSuggest.belongsTo(Vehicle, {onDelete: 'cascade', hooks:true})
Vehicle.hasOne(VehicleSuggest, {onDelete: 'cascade', hooks:true})

// reception_customer_sell
ReceptionCustomerSell.belongsTo(Employee, {onDelete: 'cascade', hooks:true})
Employee.hasMany(ReceptionCustomerSell, {onDelete: 'cascade', hooks:true})
ReceptionCustomerSell.belongsTo(Customer, {onDelete: 'cascade', hooks:true})
Customer.hasMany(ReceptionCustomerSell, {onDelete: 'cascade', hooks:true})

// transaction
Transaction.belongsTo(Employee, {onDelete: 'cascade', hooks:true})
Transaction.belongsTo(Customer, {onDelete: 'cascade', hooks:true})
Employee.hasMany(Transaction, {onDelete: 'cascade', hooks:true})
Customer.hasMany(Transaction, {onDelete: 'cascade', hooks:true})

// transaction detail sell
TransactionDetailSell.belongsTo(Vehicle, {onDelete: 'cascade', hooks:true})
Vehicle.hasOne(TransactionDetailSell, {onDelete: 'cascade', hooks:true})
TransactionDetailSell.belongsTo(Transaction, {onDelete: 'cascade', hooks:true})
Transaction.hasMany(TransactionDetailSell, {onDelete: 'cascade', hooks:true})

// transaction detail buy
TransactionDetailBuy.belongsTo(VehiclePurchase, {onDelete: 'cascade', hooks:true})
VehiclePurchase.hasOne(TransactionDetailBuy, {onDelete: 'cascade', hooks:true})
TransactionDetailBuy.belongsTo(Transaction, {onDelete: 'cascade', hooks:true})
Transaction.hasMany(TransactionDetailBuy, {onDelete: 'cascade', hooks:true})

// technical_repair
TechnicalRepair.belongsTo(Employee, {onDelete: 'cascade', hooks:true})
Employee.hasMany(TechnicalRepair, {onDelete: 'cascade', hooks:true})
TechnicalRepair.belongsTo(VehicleRepair, {onDelete: 'cascade', hooks:true})
VehicleRepair.hasOne(TechnicalRepair, {onDelete: 'cascade', hooks:true})

// technical_test
TechnicalTest.belongsTo(Employee, {onDelete: 'cascade', hooks:true})
Employee.hasMany(TechnicalTest, {onDelete: 'cascade', hooks:true})

// test_bike
VehicleTest.belongsTo(ReceptionCustomerSell, {onDelete: 'cascade', hooks:true})
ReceptionCustomerSell.hasMany(VehicleTest, {onDelete: 'cascade', hooks:true})
VehicleTest.belongsTo(TechnicalTest, {onDelete: 'cascade', hooks:true})
TechnicalTest.hasMany(VehicleTest, {onDelete: 'cascade', hooks:true})
VehicleTest.belongsTo(VehicleType, {onDelete: 'cascade', hooks:true})
VehicleType.hasOne(VehicleTest, {onDelete: 'cascade', hooks:true})

// user
User.belongsTo(Role, {onDelete: 'cascade', hooks:true})
Role.hasMany(User, {onDelete: 'cascade', hooks:true})

// vechicle_purchase
VehiclePurchase.belongsTo(ReceptionCustomerSell, {onDelete: 'cascade', hooks:true})
ReceptionCustomerSell.hasMany(VehiclePurchase, {onDelete: 'cascade', hooks:true})

VehiclePurchase.belongsTo(VehicleType, {onDelete: 'cascade', hooks:true})
VehicleType.hasMany(VehiclePurchase, {onDelete: 'cascade', hooks:true})

// vehicle  repair
VehicleRepair.belongsTo(VehiclePurchase, {onDelete: 'cascade', hooks:true})
VehiclePurchase.hasOne(VehicleRepair, {onDelete: 'cascade', hooks:true})


// user room
UserInRoom.belongsTo(User, {onDelete: 'cascade', hooks:true })
UserInRoom.belongsTo(Room, {onDelete: 'cascade', hooks:true })
User.hasMany(UserInRoom, {onDelete: 'cascade', hooks:true })
Room.hasMany(UserInRoom, {onDelete: 'cascade', hooks:true })

Room.belongsTo(User, {onDelete: 'cascade', hooks:true })*/
