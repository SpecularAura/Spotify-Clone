import React, { useState, useEffect } from 'react';

const SoundCloudTracks = () => {
  const [soundcloudData, setSoundcloudData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/soundcloud-tracks');
        const data = await response.json();
        console.log('Data from server:', data);
        setSoundcloudData(data);
      } catch (error) {
        console.error('Error fetching SoundCloud data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div>
      <h1>SoundCloud Tracks</h1>
      {soundcloudData && soundcloudData.length > 0 ? (
  <ul>
    {soundcloudData.map(track => (
      <li key={track.id}>{track.title}</li>
    ))}
  </ul>
) : (
  <p>No SoundCloud tracks available.</p>
)}

    </div>
  );
};

export default SoundCloudTracks;
