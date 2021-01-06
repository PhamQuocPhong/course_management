// config mail server
const formatEmail = require("../helpers/format_email")
const nodeMailer =  require('nodemailer');
var transporter =  nodeMailer.createTransport({ 
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

let sendMailRegister = (from, mailTo, subject, verifyCode) => {

	   // thiết lập đối tượng, nội dung gửi mail
    var mainOptions = { 
            from: from,
            to: mailTo,
            subject: subject,
            html: formatEmail.formatRegister(verifyCode)
    }

    transporter.sendMail(mainOptions, function(err, info){
          if (err) {
              console.log(err);
          } else {
              console.log('Email sent success')
          }
      });
}

let sendMailContactCustomer = async  (from, mailTo, subject, customer, callback) => {

   var mainOptions = { 
            from: from,
            to: mailTo,
            subject: subject,
            html: formatEmail.formatContactCustomer(customer)
    }

    await transporter.sendMail(mainOptions, function(err, info){
          if (err) {
              console.log("Send mail error!")
              callback(false)
          }

          console.log("Send mail success!")
          if(typeof callback === 'function'){
            callback(true)
          }
    });
}


module.exports = {
	sendMailRegister: sendMailRegister,
  sendMailContactCustomer: sendMailContactCustomer,
}