// const router = require("express").Router();
import  Router  from 'express';
const router = Router();
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//REGISTER

router.post("/register", async (req, res) => {
 
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password,salt);
  
    User.find({email: req.body.email})
        .exec()
        .then(user => {
        if(user.length >= 1){
        return res.status(409).json({
         message: 'Email already exists'
        });
        } else {
                // Create a user
         const newUser = new User({
        username: req.body.username,  
         email: req.body.email, 
        password: hashedpassword
        });
                
        newUser.save()
        .then(result => {
        const token = jwt.sign({id: result._id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
         res.status(201).json({
        status: 'successfully',
        token,
         data: {
        user: result
        }
        });
        })
        .catch(error => {
        res.status(500).json({
        error
        });
        });
        }
        })
        .catch(error => {
            res.status(500).json({
                error
            });
        });
  });

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong credentials!");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong credentials!");

    // const { password, ...others } = user._doc;
   return res.status(200).json({
      message:"logged successfully"
    });
  } catch (err) {
   return res.status(500).json(err);
  }
});

export default router;
