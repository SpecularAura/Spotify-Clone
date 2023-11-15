import React from 'react'
import songContext from './SongContext'
import { songsdata } from "../components/BottomBar/audios";
import { useRef, useState, useEffect } from "react";

function SongState(props) {
const [songs, setSongs] = useState(songsdata);
const [isplaying, setisplaying] = useState(false);
const [currentSong, setCurrentSong] = useState(songsdata[1]);
const [ct, setCt] = useState(0);
const audioElem = useRef();

  return (
    <songContext.Provider value={{songs, setSongs, isplaying, setisplaying, currentSong, setCurrentSong, ct, setCt, audioElem}}>
    {props.children}
  </songContext.Provider>
  )
}

export default SongState