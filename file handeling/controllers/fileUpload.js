const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

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

// require function for file upload..................

function isFileTypeSupported(type , supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = {folder};
    console.log("temp file path", file.tempFilePath);

    if(quality) {
        options.quality = quality;
    }

    options.resource_type = "auto";
   return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//image upload.................................

exports.imageUpload = async (req, res) => {
    try {
        //data fetched...........
        const {name, tags, email} = req.body;
        console.log(name,tags,email);
        const file = req.files.imageFile;
        console.log(file);
        //validation..........

        const supportedTypes = ["jpg", "png", "jpeg"];

        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type", fileType);


        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        //when file format is supported...............
        console.log("Uploading to cloudinary")
        const response = await uploadFileToCloudinary(file, "tempFolder");
        console.log(response);
        // save to db......
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        res.json({
            success: true,
            imageUrl:response.secure_url,
            message: "Image Successfully uploaded",

        })





    } catch (error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message: "Something went wrong",
        });
    }
}

//video upload handler.............

exports.videoUpload = async (req, res) => {
    try {
        const {name, tags, email} = req.body;
        console.log(name,tags,email);
        const file = req.files.videoFile;
        
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type", fileType);

        // add a upper limit of 5MB for videos...

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported",
            })
        }
        console.log("Uploading to cloudinary")
        const response = await uploadFileToCloudinary(file, "tempFolder");
        console.log(response);

         // save to db......
         const fileData = await File.create({
            name,
            tags,
            email,
           // imageUrl:response.secure_url,
        })

        res.json({
            success: true,
    // imageUrl:response.secure_url,
            message: "Video Successfully uploaded",

        })

    } catch (error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message: "Something went wrong",
        })
    }
}

//image reducer..................
exports.imageSizeReducer = async (req , res) => {
    try {
        //data fetched...........
        const {name, tags, email} = req.body;
        console.log(name,tags,email);
        const file = req.files.imageFile;
        console.log(file);
        //validation..........

        const supportedTypes = ["jpg", "png", "jpeg"];

        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type", fileType);


        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        //when file format is supported...............
        console.log("Uploading to cloudinary")
        const response = await uploadFileToCloudinary(file, "tempFolder");
        console.log(response);
        // save to db......
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        res.json({
            success: true,
            imageUrl:response.secure_url,
            message: "Image Successfully uploaded",

        })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message: "Something went wrong",
        })
    }
}

//Mailer function.............


