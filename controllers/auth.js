const User = require('../models/user')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

exports.signup = (req, res) => {
  console.log("req.body", req.body)
  const user =new User(req.body)

  user.save((err, user) => {
    if (err){
      return res.status(400).json({
        err
      })
    }
    user.salt =undefined;
    user.hashed_password =  undefined;
     res.json({
       user
     })
  })
};

exports.signin =(req, res) => {
  const { email, password} = req.body
  user.findOne({email}, (err, user) => {
    if(err || !user) {
      return res.status(400).json({
        err: "User with this email does not exist. Please signup"
      });
    }
    // if user found than authentication
    //create authenticate method in user model
   if(!user.authenticate(password)) {
     return res.status(401).json({
       error: "Email and Password dont match"
     });
   }
    //generate a signed in token
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)

    res.cookie('t', token, {expire: new Date() + 9999})

    const {_id, name, email, role} = user
    return res.json({token, user: {_id, email, name, role}})

  })
}

exports.signout = (req, res) => {
  res.clearCookie('t')
  res.json({message: "signout successful"})
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth"
})

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id
   if(!user) {
     return res.status(403).json({
       error: "Access denied"
     })
   }
   next();

}

exports.isAdmin = (req, res, next) => {
  if(res.profile.role == 0) {
    return res.status(403).json({
      error: "Admin resource! Access denied"
    });
  }
  next();
}
