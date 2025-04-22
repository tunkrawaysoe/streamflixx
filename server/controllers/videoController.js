import Video from "../models/Video.js";

export const uploadVideo = async (req,res) => {

  try {
    console.log('Uploaded file:', req.file); // Debug line
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'No video file uploaded' });
    }

    const video = await Video.create({
      title,
      description,
      filename: req.file.filename,
      uploader: req.user.id,
    });

    res.status(201).json(video);
  } catch (err) {
    console.error('Upload error:', err.message);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
}


export const getAllVideos = async (req,res) => {
    const videos = await Video.find().sort({ uploadedAt: -1 }).populate('uploader', 'username');
    res.json(videos);
    
}