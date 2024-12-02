const { response } = require("express");
const mongoose = require("mongoose");
//const nodemailer = require("nodemailer");
const transporter = require("../config/nodeMailer");

const fileSchema =  new mongoose.Schema( {
    name: {
        type:String,
        required: true,
    },
    imageUrl:{
        type:String,
    },
    tags: {
        type: String,
    },
    email:{
        type: String,
    }
});


//post middleware
fileSchema.post("save", async function(doc) {
    try {
        console.log("DOC", doc)

        //transporter....
        // let transporter = nodemailer.createTransport({
        //     host: process.env.MAIL_HOST,
        //     auth:{
        //         user: process.env.MAIL_USER,
        //         pass: process.env.MAIL_PASS,
        //     },
        // });

        //send mail....
        let info = await transporter.sendMail({
            from:`Anindya`,
            to: doc.email,
            subject: "New file uploaded to Cloudinary",
            html:`<h2>Hello! </h2><p>File Uploaded, view here: <a href="${doc.imageUrl}">${doc.imageUrl}</a></p> `,
        })

        console.log("INFO", info);

    } catch (error) {
        console.error(error);
        
    }
})

const File = mongoose.model("File", fileSchema);

module.exports = File;


