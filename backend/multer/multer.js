const multer = require("multer");

const MIME_TYPE = {
  'image/png':'png',
  'image/jpg':'jpg',
  'image/jpeg':'jpeg',

}

const storage = multer.diskStorage({
  destination : (req, file, cb)=> {
    const isValid = MIME_TYPE[file.mimetype]
    const error = new Error('Invalid file type')
    if(isValid){
      errors = null
    }
    cb(errors, "backend/images/");
  },

  filename: (req, file, cb)=> {
    const ext = MIME_TYPE[file.mimetype]
    let filename = file.originalname.toLowerCase().split(' ').join('-') + '.' + ext
    console.log(filename);
    cb(null, Date.now() +  filename);
  },
});


exports.multer = multer({ storage: storage }).single('image')
