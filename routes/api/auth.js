const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config= require('config');


router.get('/user', auth, async (req, res)=>{
    try {
        const user =  await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (err) {
        console.error(err.message);
         res.status(400).send('server error')
        
    }
})
router.post('/', [
    check('email', 'please enter the valid email').isEmail(),
    check('password', 'please enter the 6 and more password').exists()
],
async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email, password}= req.body;
    try {
      let user = await User.findOne({email});
      if(!user){
          res.status(400).json({errors:[{msg:'invalid'}]})
      }
     const isMatch = await bcrypt.compare(password, user.password)
     if(!isMatch){
        res.status(400).json({errors:[{msg:'invalid password'}]})
    }
     const payload = {
         user:{
             id: user.id
         }
     }
     jwt.sign(payload, config.get("jwtSecret"),
     { expiresIn:360000 },(err, token)=>{
         if(err) throw err;
         res.json({token})
     }) 
    } catch (error) {
     console.error(error.message);
     res.status(5000).send('server error')   
    }
    
})

/*router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) throw Error('User Does not exist');
    res.json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});*/
module.exports= router;