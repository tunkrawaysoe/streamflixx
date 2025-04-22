const API_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchVideos = async () => {
  const res = await fetch(`${API_URL}/videos`);
  if (!res.ok) throw new Error('Failed to fetch videos');
  return res.json();
};

export const uploadVideo = async (formData, token) => {
  const res = await fetch(`${API_URL}/videos/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error('Video upload failed');
  return res.json();
};

export const getStreamUrl = (filename) => `${API_URL}/videos/stream/${filename}`;
