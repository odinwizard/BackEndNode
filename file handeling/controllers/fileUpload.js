const File = require("../models/File");

exports.localFileUpload = async ( req, res) => {
    try {
        //fetch..............
        const file = req.files.file;
        console.log("FILE IS HERE", file);
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        file.mv(path , (err) => {
            console.log(err);
        });
        res.json({
            success:true,
            message: 'Local file uploaded successfully',
        });
    } catch (error) {
        console.log(error);
    }
}