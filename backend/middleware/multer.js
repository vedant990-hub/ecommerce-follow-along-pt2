const multer = require("multer");

const storage = multer.diskStorage({
    destination: '../uploads',
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        console.log(req.body);
        const filename = file.originalname.split(".")[0];
        cb(null, filename + "-"+uniqueSuffix+".png");
    },
})

const psstorage = multer.diskStorage({
    destination: '../products',
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        console.log(req.body);
        const filename = file.originalname.split(".")[0];
        cb(null, filename + "-"+uniqueSuffix+".png");
    },
})


exports.upload = multer({ storage: storage });

exports.pupload = multer({ storage: psstorage });