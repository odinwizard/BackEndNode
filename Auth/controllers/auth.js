const User = require("../models/user");  
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { options } = require("../routes/user");

require("dotenv").config();

exports.signup = async (req, res ) => {
    try {
        
        const {name, email, password, role} = req.body;
        //check if user is exitst..
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return resizeBy.status(400).json({
                success: false,
                message: 'User already exists',
            });
        }

        // Secure the password............
        let hashedPassword;
         try {
          hashedPassword = await bcrypt.hash(password, 10);
         } catch (err) {
            return res.status(500).json({
                success:false,
                message:'Error in hashing password',
            });
         }
         const user = await User.create({
            name,email,password:hashedPassword,role
         })

         return res.status(200).json({
            success: true,
            message: 'User created successfully'
         })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'User cannot be registerd, please try again later'
        });
    }
}


exports.login = async (req, res) => {
     try {
        
        //data fetch...
        const {email, password} = req.body;

        //validation on email and password..

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message:'Pleasefill all the details',
            });
        }

        //check for register user.....
        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).json({
                success:false,
                messsage:'User is not registered',
            });
        }

        const payload = {
            email:user.email,
            id:user._id,
            role:user.role
        };
        //verify password and generate a jwt token..
        if (await bcrypt.compare(password, user.password)) {
            //password matched...
            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                                    expiresIn:"2h",
            });

            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }   

            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user,
                message: 'User loggedin successfully'
            })


        } else {
            return res.status(403).json({
                success:false,
                message:'password incorrect',
            });
        }

     } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login failure',
        });
     }
}