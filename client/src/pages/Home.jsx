import React, { useEffect, useState } from 'react';
import UploadForm from '../components/UploadForm';
import VideoList from '../components/VideoList';
import VideoPlayer from '../components/VideoPlayer';
import { fetchVideos } from '../api/videoApi';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchVideos();
        setVideos(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    load();
  }, []);

  const handleNewUpload = (video) => {
    setVideos((prev) => [video, ...prev]);
  };

  return (
    <div>
      <UploadForm onUpload={handleNewUpload} />
      <VideoList videos={videos} onSelect={setSelectedVideo} />
      <VideoPlayer filename={selectedVideo} />
    </div>
  );
};

export default Home;
