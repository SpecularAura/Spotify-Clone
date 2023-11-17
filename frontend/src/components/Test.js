import React, { useContext, useState, useEffect } from 'react';
import songContext from '../context/SongContext';

function Test() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [audioSrc, setAudioSrc] = useState('');
  const context = useContext(songContext);
  const {
    songs,
    setSongs,
    isplaying,
    setisplaying,
    currentSong,
    setCurrentSong,
    ct,
    setCt,
  } = context;

//   useEffect(() => {
//     const audioPlayer = document.getElementById('audioPlayer');

//     if (audioPlayer && audioSrc) {
//       audioPlayer.src = audioSrc;
//       audioPlayer.play();
//     }
//   }, [audioSrc]);

  const updateCurrent = () => {
    setCurrentSong(songs[songs.findIndex(el => el.id == searchResults.id)]);
  };

  const handleSearch = () => {
    fetch('http://127.0.0.1:5000/api/search', {
      method: 'POST',
      body: new URLSearchParams({ 'search_box': searchTerm }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
        setSongs(data);
      });
  };

  const playSong = (artist, title, id) => {
    fetch(`http://127.0.0.1:5000/api/stream?artist=${artist}&song=${title}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.blob();
      })
      .then((blob) => {
        const objectURL = URL.createObjectURL(blob);
        setAudioSrc(objectURL);
        setCurrentSong({
          id: id,
          title: title,
          artist: artist,
          image: "", // Set the image as needed
          url: objectURL,
        });
      })
      .catch((error) => {
        console.error('Error fetching audio:', error);
      });
  };
  

   return (
    <div className="App">
      <h1 className="text-3xl font-bold mb-4">Music Search</h1>
      <div className="mb-4">
        <label htmlFor="search_box" className="mr-2">
          Search for a song:
        </label>
        <input
          type="text"
          id="search_box"
          placeholder="Enter song name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded py-1 px-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white rounded py-1 px-2 ml-2"
        >
          Search
        </button>
      </div>
      <div id="results" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {searchResults.map((result) => (
          <div key={result.id} className="bg-white p-4 rounded shadow">
            <img src={result.image} alt={result.title} className="mb-2 rounded" />
            <div>
              <p className="font-bold">{result.title}</p>
              <p className="text-gray-600">{result.artist}</p>
            </div>
            <button
  onClick={() => playSong(result.artist, result.title, result.id)}
  className="bg-blue-500 text-white rounded mt-2 py-1 px-2"
>
  Play
</button>

          </div>
        ))}
      </div>
      {/* <audio controls id="audioPlayer" className="mt-4"></audio> */}
    </div>
  );
}

export default Test;
