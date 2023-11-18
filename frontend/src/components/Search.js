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
        <label
          htmlFor="search_box"
          className="text-black w-12 h-10 flex items-center justify-center absolute top-0 left-0"
        >
          <Icon size={24} name="search" />
        </label>

        <input
          autoFocus={true}
          type="text"
          id="search_box"
          className="h-10 pl-12 outline-none text-black font-medium bg-white rounded-3xl text-sm placeholder-black/50 max-w-full w-[22.75rem]"
          placeholder="What do you want to listen to?"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
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
            className="bg-footer p-4 rounded transition-all duration-200 ease-in hover:bg-active group"
          >
            <div className="pt-[100%] relative mb-4">
              <img
                src={result.image}
                alt={result.title}
                className="absolute inset-0 object-cover w-full h-full"
              />
              <button
                onClick={() => playSong(result.artist, result.title, result.id)}
                className={`w-11 h-11 transition-all duration-200 ease-in rounded-full text-black bg-primary opacity-0 absolute flex bottom-0 right-2 items-center justify-center group-hover:opacity-100 group-hover:bottom-2 hover:scale-110`}
              >
                <Icon size={20} name="play" isBlack={true} />
              </button>
            </div>

            <h6 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-base font-semibold">
              {result.title}
            </h6>
            {/* <p className="line-clamp-2 text-link text-sm mt-1">
              {result.artist}
            </p> */}

            
          </div>
        ))}
      </div>
 
    </div>
  );
}

export default Search;
