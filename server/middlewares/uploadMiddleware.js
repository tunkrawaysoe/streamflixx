import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Store videos in /uploads
    },
    filename: function (req, file, cb) {
      const uniqueName = Date.now() + '-' + file.originalname;
      cb(null, uniqueName);
    },
  });
  
  const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.mp4') {
      return cb(new Error('Only MP4 videos are allowed'), false);
    }
    cb(null, true);
  };
  
  const upload = multer({ storage, fileFilter });

  export default upload;