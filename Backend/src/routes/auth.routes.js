const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model")
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/signup" , async(req , res) => {
    try{
        const {name , email , password } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message : "please fill in all the fields" ,
            });
        }

        if(password.length < 8){
            return res.status(400).json({
                message: "Password must be atleast 8 Characters" ,
            });
        }


        const cleanEmail = email.toLowerCase().trim();
        const existingUser = await User.findOne({
            email : cleanEmail ,
        });

        if(existingUser){
        return res.status(409).json({
        message: "An account with this email already exists",
           });
        }

        const hashedPassword = await bcrypt.hash(password , 10);

        const user = await User.create({
            name : name.trim(),
            email : cleanEmail,
            password : hashedPassword,
        });

        res.status(201).json({
            message : "Account created Successfully" ,
            user : {
                id : user._id ,
                name : user.name ,
                email : user.email ,
            } ,
        });

    }
    catch(error){
        console.error("Signup error : ", error);

        res.status(500).json({
            message : "Server error . Please try again." ,
        });
    }
});


router.post("/login" , async(req , res) => {
    try{
        const{email , password} = req.body;

        if(!email || !password){
            return res.status(400) , json({
                message : "Please enter email and password" ,
            }); 
     }

    
    const cleanEmail = email.toLowerCase().trim();
    
    const user = await User.findOne({ email: cleanEmail }).select("+password");

    if(!user){
        return res.status(401).json({
            message: "Invalid email or password" ,
        });
    }

    const isPasswordCorrect = await bcrypt.compare(password,user.password);

    if(!isPasswordCorrect){
        return res.status(401).json({
            message : "Invalid Email or password"
        });
    }

    if(!process.env.JWT_SECRET){
        console.error("JWT_SECRET is missing");

        return res.status(500).json({
            message : "Server configuration error" ,
        });
    }

    const token = jwt.sign(
        {
            id : user._id ,
            email : user.email ,
        } ,
        process.env.JWT_SECRET ,{
            expiresIn : "7d" ,
        }
    );

    res.status(200).json({
        message : "Login Successful" ,
        token ,
        user : {
            id : user._id ,
            name : user.name ,
            email : user.email ,
        } ,
    });
    }

    catch(error) {
        console.error("Login error :", error);

        res.status(500).json({
            message : "Server error please try again. ",
        });
    }
});


router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Me error:", error);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;