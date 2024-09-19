const User = require("../models/user");  
const bcrypt = require("bcrypt");

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