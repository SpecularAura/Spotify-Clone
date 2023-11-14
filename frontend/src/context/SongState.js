import React from "react";
import songContext from "./SongContext";
import { songsdata } from "../components/BottomBar/audios";
import { useRef, useState, useEffect } from "react";

function SongState(props) {
  const [songs, setSongs] = useState(songsdata);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songsdata[0]);
  return (
    <songContext.Provider
      value={{
        songs,
        setSongs,
        isPlaying,
        setIsPlaying,
        currentSong,
        setCurrentSong,
      }}
    >
      {props.children}
    </songContext.Provider>
  );
}

export default SongState;
