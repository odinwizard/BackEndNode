const express = require("express");
const router = express.Router();

const {login, signup} = require("../controllers/auth");
const {auth, isStudent, isAdmin} = require("../middleware/auth")

router.post("/login", login);
router.post("/signup", signup);

//Protected route............

router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success:true,
        message:'Welcome to the Protected route for students'
    });
})

router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success:true,
        message:'Welcome to the Protected route for admin'
    });
})


module.exports = router;

