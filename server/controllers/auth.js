const userModel = require('../models/user');
const activeEmailModel = require('../models/active_mail');
const {Sequelize, DataTypes } = require('sequelize')
const Op = Sequelize.Op;

var nodemailer =  require('nodemailer');
var randomstring = require("randomstring");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var moment = require('moment');
const jwtHelper = require('../helpers/jwt.helper');

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h"
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "365d"
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-ptudw"
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret-ptudw"


let register = async (req, res) => {
  try {
  
    const {name, email, password} = req.body
   
    var findUser = await userModel.findOne({
      where: {email: email}
    })
    
    var verifyCode = randomstring.generate()

    if(findUser){
      return res.status(401).json({message: 'This email is existed!'})
    }
    console.log("test3");
   

    var newUser = await userModel.create({
      name: name,
      email: email,
      password: bcrypt.hashSync(password, 10),
      roleId: 3,
      active: false,
      rfToken: verifyCode,
    }).then(function(user){
      if(user)
      { 
          try
          {
            //req.session.userId = user.id;
            var transporter =  nodemailer.createTransport({ // config mail server
              host: 'smtp.gmail.com',
              port: 465,
              secure: true,
              auth: {
                  user: 'academy6868@gmail.com',
                  pass: 'uarvqtnyovhyxqrc' // create app password for email -> gg search
              }
          });
  
           var secretToken = randomstring.generate({
              length: 20,
              charset: 'alphabetic'
            });
  
           var newActive =  activeEmailModel.create({
              otp: secretToken,
              active: true,
              date: moment().add(15, 'minutes'), //sau 15 phút không còn hạn
              createdAt: Date.now(),
              updateAt: Date.now(),
              userId: user.id
           });
  
  
            var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
                from: 'academy6868@gmail.com',
                to: email,
                subject: 'Active email',
                text: 'You recieved message from ' + 'academy6868',
                html: 'Mã xác nhận của bạn là: ' + secretToken
            }
            transporter.sendMail(mainOptions, function(err, info){
                if (err) {
                  return res.status(500).send({message: 'Error, can not sent otp. try later!', err});
                } else {
                  console.log('Message sent: ' +  info.response);
                  return res.status(201).json({message: 'Sucess!'});
                }
            });          
          }
          catch(error)
          {
            return res.status(500).send({message: 'Error, can not create otp. try later!', error:error});
          }
       }  
    });
  
  } catch(error) {
     return res.status(500).json(error)
  }
}

let verifyOTP = async (req, res) => {
  try {
    //Đúng mai
    const {email, otp} = req.body
   
    var findUser = await userModel.findOne({
      where: {email}
    })
    
    if(findUser)
    {
      console.log("test1");
      var activeEmail = await activeEmailModel.findOne({
        where: {
          userId: findUser.id,
          otp,
          active: true,
          date: {
            [Op.gte]: new Date()
          }
        }
      });
     
      if(activeEmail)
      {
        try
        {
          await userModel.update(
            { active: true },
            { where: { email} }
          ).then(async function(){
            console.log("sss")
            await activeEmailModel.update(
              { active: false },
              { where: { userId: findUser.id} }
          );
          })
        }
        catch
        {
          return res.status(500).send({message: 'can not active accout. try again!'})
        }
        return res.status(200).send({message: 'Success!'})
      }
      else
      {
          return res.status(401).send({message: 'otp not avaible!'})
      }
    }
    else
    {
        return res.status(401).send({message: 'Email not existed!'})
    }
  
  }
  catch(error){
    return res.status(500).json(error)
  }
}

let login = async (req, res) => {

  
	const { email, password } = req.body

	try {
    const findUser = await userModel.findOne({
      attributes: ['id','name', 'email', 'password', 'roleId'],
      where: {
        email: email,
        active: true
      }
    })
    console.log("test")

    if(findUser && bcrypt.compareSync(password, findUser.password)){
      console.log("testdn")
      delete findUser.dataValues.password
      const accessToken = await jwtHelper.generateToken(findUser.id, accessTokenSecret, accessTokenLife)
      const refreshToken = await jwtHelper.generateToken(findUser.id, refreshTokenSecret, refreshTokenLife)

      console.log("testdn1")
      await userModel.update(
        
        {rfToken: refreshToken},
        {where: {id: 1}},
      );

      return res.status(200).json({accessToken, refreshToken, findUser})
    }else{
      return res.status(401).send({message: "Email or Password is not exactly or account is not active!" })
    }

	}catch (error) {
	    return res.status(500).json(error)
	}
}

let adminLogin = async (req, res) => {
	const { email, password } = req.body

	try {
    const findUser = await userModel.findOne({
      attributes: ['id','name', 'email', 'password', 'roleId'],
      where: {
        email: email,
        active: true,
        roleId: 1
      }
    })
    console.log("test")

    if(findUser && bcrypt.compareSync(password, findUser.password)){
      console.log("testdn")
      delete findUser.dataValues.password
      const accessToken = await jwtHelper.generateToken(findUser.id, accessTokenSecret, accessTokenLife)
      const refreshToken = await jwtHelper.generateToken(findUser.id, refreshTokenSecret, refreshTokenLife)

      console.log("testdn1")
      await userModel.update(
        
        {rfToken: refreshToken},
        {where: {id: 1}},
      );

      return res.status(200).json({accessToken, refreshToken, findUser})
    }else{
      return res.status(401).send({message: "Email or Password is not exactly or account is not active!" })
    }

	}catch (error) {
	    return res.status(500).json(error)
	}
}


module.exports = {
    register,
    verifyOTP,
    login,
    adminLogin
}