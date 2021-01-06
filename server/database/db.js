const {Sequelize, DataTypes } = require('sequelize')
const path = require( "path" )
require('dotenv').config({path: path.resolve('../.env')})


const url = process.env.DATABASE_URL || 'postgres://ictanavodveuru:f69d6727f3c2a2c167a17bbec8c9051ec651a4f646a50ec69334283c135bae7c@ec2-35-153-12-59.compute-1.amazonaws.com:5432/dfdldnhcldm4c4?ssl=true'
const db = new Sequelize('dfdldnhcldm4c4', 'ictanavodveuru', 'f69d6727f3c2a2c167a17bbec8c9051ec651a4f646a50ec69334283c135bae7c', {
    host: 'ec2-35-153-12-59.compute-1.amazonaws.com',
    port: 5432,
    dialect: 'postgres',
    protocol: 'postgres',
  
	dialectOptions: {
        useUTC: false, //for reading from database
        ssl: true,
        ssl: { rejectUnauthorized: false }

    }
    ,
    timezone: '+07:00' 
})
module.exports = db
