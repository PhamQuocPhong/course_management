const userModel = require('../models/user');

let register = async (req, res) => {
    try {
  
      const {password, email, name} = req.body
     
      var findUser = await userModel.findOne({
        where: {email: email}
      })
  
      var verifyCode = randomString.generate()
  
      if(findUser){
        return res.status(401).json({message: 'This email is existed!'})
      }
  
      var newUser = await userModel.create({
        email: email,
        password: bcrypt.hashSync(password, 10),
        rfToken: verifyCode,
      })
      
    } catch(error) {
       return res.status(500).json(error)
    }
  
}
module.exports = {
    register
}