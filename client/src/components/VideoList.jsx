import React from 'react';

const VideoList = ({ videos, onSelect }) => (
  <div>
    <h2>Video List</h2>
    {videos.map((v) => (
      <div key={v._id}>
        <h3>{v.title}</h3>
        <p>{v.description}</p>
        <button onClick={() => onSelect(v.filename)}>Play</button>
      </div>
    ))}
  </div>
);

export default VideoList;
