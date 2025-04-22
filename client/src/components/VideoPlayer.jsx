import React from 'react';
import { getStreamUrl } from '../api/videoApi';

const VideoPlayer = ({ filename }) => {
  if (!filename) return null;

  const videoUrl = `http://localhost:5000/api/videos/stream/${encodeURIComponent(filename)}`;

  
  return (
    <div>
      <h2>Now Playing</h2>
      <video key={filename} width="720" controls src={videoUrl} />
    </div>
  );
};


export default VideoPlayer;
