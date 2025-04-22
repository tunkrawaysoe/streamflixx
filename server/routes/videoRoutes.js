import express from 'express';
const router = express.Router();
import { uploadVideo,getAllVideos } from '../controllers/videoController.js';
import upload from '../middlewares/uploadMiddleware.js';
import authValidation from '../middlewares/authMiddleware.js';


router.post('/upload',upload.single('video'),authValidation,uploadVideo);
router.get('/',getAllVideos);
router.get('/get',(res,req)=>{
    res.json({message: "Yah"})
})

export default router