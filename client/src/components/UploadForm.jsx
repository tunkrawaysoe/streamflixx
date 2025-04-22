import React, { useState } from 'react';
import { uploadVideo } from '../api/videoApi';

const UploadForm = ({ onUpload }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile) return alert('Select a video file');

    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('title', title);
    formData.append('description', description);

    try {
      const token = 'your-token'; // Replace with real auth
      const uploaded = await uploadVideo(formData, token);
      onUpload(uploaded);
      setTitle('');
      setDescription('');
      setVideoFile(null);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload Video</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files[0])} required />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
