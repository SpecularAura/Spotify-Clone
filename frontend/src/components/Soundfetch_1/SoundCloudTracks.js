import React, { useEffect, useState } from 'react';

function Content() {
  const [audio, setAudio] = useState(null);

  const playAudio = () => {
    fetch('http://localhost:5000/stream')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then(data => {
        const audioUrl = URL.createObjectURL(data);
        const newAudio = new Audio(audioUrl);
        newAudio.play();
        setAudio(newAudio);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  };

  const pauseAudio = () => {
    if (audio) {
      audio.pause();
    }
  };

  return (
    <div>
      <button onClick={playAudio}>Play Audio</button><br />
      <button onClick={pauseAudio}>Pause Audio</button>
    </div>
  );
}

export default Content;
