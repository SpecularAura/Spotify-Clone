import React, { useContext, useState, useEffect } from "react";
import songContext from "../context/SongContext";
import { Icon } from "../Icons";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [audioSrc, setAudioSrc] = useState("");
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
    setCurrentSong(songs[songs.findIndex((el) => el.id == searchResults.id)]);
  };

  const handleSearch = () => {
    fetch("http://127.0.0.1:5000/api/search", {
      method: "POST",
      body: new URLSearchParams({ search_box: searchTerm }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
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
        console.error("Error fetching audio:", error);
      });
  };

  return (
    <div className="overflow-y-auto h-screen">
      
      <div className="mr-auto ml-4 relative mt-2">
    
        <label htmlFor="search_box" className="text-black w-12 h-10 flex items-center justify-center absolute top-0 left-0"><Icon size={24} name="search" />
			</label>
        {/* <input
          type="text"
          id="search_box"
          placeholder="Enter song name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded py-1 px-2"
        /> */}
        <input autoFocus={true} type="text" id="search_box" className="h-10 pl-12 outline-none text-black font-medium bg-white rounded-3xl text-sm placeholder-black/50 max-w-full w-[22.75rem]" placeholder="What do you want to listen to?" onChange={(e) => setSearchTerm(e.target.value)}  value={searchTerm}/>
        <button
          onClick={handleSearch}
          className="bg-primary hover:bg-opacity-50 text-white rounded py-1 px-2 ml-2"
        >
          Search
        </button>
      </div>
      {/* <div
        id="results"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      > */}
        <div className="grid grid-cols-5 gap-x-6">
          {searchResults.map((result) => (
            <div
              key={result.id}
              className="bg-footer p-4 rounded hover:bg-active group"
            >

              <div className="pt-[100%] relative mb-4">
                <img
                  src={result.image}
                  alt={result.title}
                  className="absolute inset-0 object-cover w-full h-full"
                />
                <button
                  onClick={() =>
                    playSong(result.artist, result.title, result.id)
                  }
                  className={`w-10 h-10 rounded-full bg-primary absolute group-hover:flex group-focus:flex bottom-2 right-2 items-center justify-center `}
                >
                  <Icon size={16} name="play" />
                </button>
              </div>

              <div>
               
                <h6 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-base font-semibold">
                {result.title}
      </h6>
      <p className="line-clamp-2 text-link text-sm mt-1">{result.artist}</p>
              </div>
              {/* <button
              onClick={() => playSong(result.artist, result.title, result.id)}
              className="bg-blue-500 text-white rounded mt-2 py-1 px-2"
            >
              Play
            </button> */}
            </div>
          ))}
        </div>
      {/* </div> */}
      {/* <audio controls id="audioPlayer" className="mt-4"></audio> */}
    </div>
  );
}

export default Search;
