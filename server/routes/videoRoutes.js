import express from 'express';
const router = express.Router();
import { uploadVideo,getAllVideos, } from '../controllers/videoController.js';
import upload from '../middlewares/uploadMiddleware.js';
import authValidation from '../middlewares/authMiddleware.js';
import { streamVideo ,getVideoMetadata} from '../controllers/streamVideo.js';


router.post('/upload',upload.single('video'),uploadVideo);
router.get('/',getAllVideos);
router.get('/stream/:filename',streamVideo)
router.get('/meta/:filename', getVideoMetadata);
router.get('/get',(res,req)=>{
    res.json({message: "Yah"})
})

export default router